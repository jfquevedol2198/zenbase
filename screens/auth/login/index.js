import React, { useState, useEffect } from "react";
import { Text, Container, Canvas, Button } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image, Platform , Alert} from "react-native";
import SplashScreen from "screens/splash-screen";
import { Buffer } from "buffer";
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

// Import Images
import ZentbaseLogoWhite from "assets/images/zenbase-full-white-logo.png";
import ZentbaseVectorWhite from "assets/vectors/zentoken-flat-circle-logo.png";
import AppleIcon from "assets/vectors/apple.png";
import GoogleIcon from "assets/vectors/google.png";
import { handleSignInWithApple } from "helpers/auth-apple";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { queryClient } from "query/client";
import { fetchHomepage } from "query/home";
import { useAuth } from "stores/auth";
import { CommonActions } from "@react-navigation/native";
import mixpanel from "services/mixpanel";
import { parseJwt } from "helpers/parse-jwt";
import axios from "services/axios";
import Toast from 'react-native-toast-message';


// Styled Component
const ZenbaseLogo = styled.Image`
  width: 219px;
  height: 60px;
  margin-bottom: 60px;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 65px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const FotterText = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 16px;
`;

const FooterTextFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
`;

const BottomView = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 70px;
`;

export default function Login({ navigation }) {
 
  const { setUser } = useAuth();
  const { theme } = useTheme();
  const { login, refresh } = useAuth();
  const [isAppReady, setIsAppReady] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  WebBrowser.maybeCompleteAuthSession();
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId: "890282384871-bb608dsee865fjugc9p289htpehio1fq.apps.googleusercontent.com",
    androidClientId: '890282384871-qmd54ugmigtlj1tkipbb4j060n945ekh.apps.googleusercontent.com',
    iosClientId: '890282384871-o7tvsr9feoev8tsol5d7o38hemkrbghu.apps.googleusercontent.com',

  });
  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken);
      getUserInfo();
    }
  }, [response, accessToken]);
  //for get user details from google signIn result
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );
      const user = await response.json();
      setUserInfo(user);
      handleSignInWithGoogle(user)
    } catch (error) {
      // Add your own error handler here
    }
  };
  // for google signIn
  const handleSignInWithGoogle = async (user) => {
    try {
 
      const {
        data: { data },
      } = await axios.post("/auth/login", {
        username: user?.email,
        password: user?.id,
      });

      setUser(data)
      if (data.isVerified) {
        login(data);
        mixpanel.track("Login", data);
        // Reset Stack Navigation
        navigation.dispatch(
          CommonActions.reset({
            routes: [{ name: "App" }],
          })
        );
      } else {
        navigation.navigate("OTP", {
          type: "email",
          value: data.email,
          userId: data._id,
          data,
        });
      }
    } catch (e) {


      if (e.response && e.response.status === 401) {
        // User doesn't exist, show a toast message
        Toast.show({
          type: 'error',
          // position: 'center',
          text1: 'User not found',
          text2: 'There is no account associated with this Google Account. Please sign up'
        });
      } else {
        // Some other error occurred, handle it as desired
        console.error(e);
      }


      
    }
  };
  const handleAppleLogin = async () => {
    try {
      const credentials = await handleSignInWithApple();
      const identityToken = parseJwt(credentials?.identityToken);
     
      const { email: username, sub: password } = identityToken;
      const {
        data: { data },
      } = await axios.post("/auth/login", {
        username,
        password,
      });
      login(data);
      navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: "App" }],
            })
          );
          setUser(data)

      // if (data.isVerified) {
      //   login(data);
      //   mixpanel.track("Login", data);

      //   // Reset Stack Navigation
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       routes: [{ name: "App" }],
      //     })
      //   );
      // } else {
      //   navigation.navigate("OTP", {
      //     type: "email",
      //     value: data.email,
      //     userId: data._id,
      //     data,
      //   });
      // }
    } catch (e) {

    
      if (e.response && e.response.status === 401) {
      
        Alert.alert(
          "User not found",
          "There is no account associated with this Apple ID. Please sign up with your Apple ID or Google account instead.",
          [{ text: "OK" }],
          { cancelable: true }
        );
      } else {
        
        console.error(e);
      }



 
    }
  };
  const fetchUserFromAsyncStorage = async () => {
    const serializedUser = await AsyncStorage.getItem("@zenbase_user");
    if (serializedUser !== null) {
      const _user = JSON.parse(serializedUser);
      console.log(`User found in AsyncStorage ${_user.name}`);
      try {
        const decoded = _user.token.split(".")[1];
        const jwt = JSON.parse(Buffer.from(decoded, "base64").toString("utf-8"));
        if (Date.now() >= jwt?.exp * 1000) {
          
          await AsyncStorage.removeItem("@zenbase_user");
          return;
        }
      } catch (e) {
        console.error(e);
        return;
      }
      mixpanel.track("Auto Login", _user);
      await login(_user);
      await refresh();
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "App" }],
        })
      );
    } else {
      throw new Error("User data not found in Async Storage");
    }
  };
  useEffect(() => {
    (async () => {
      mixpanel.screen("Prelogin");
      try {
        await queryClient.prefetchQuery({
          queryKey: ["home"],
          queryFn: fetchHomepage,
        });
        await fetchUserFromAsyncStorage();
      } catch (e) {
        setTimeout(() => {
          setIsAppReady(true);
        }, 3000);
      }
    })();
  }, []);
  if (!isAppReady) {
    return <SplashScreen />;
  }
  return (
    <Canvas>
      <Container
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ZenbaseLogo source={ZentbaseLogoWhite} />
        <Button
          onPress={() => navigation.navigate("LoginForm")}
          variant="silent"
          fontSize="16"
          title="Sign in with email"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
        />
        {Platform.OS == "ios" && (
          <Button
            onPress={handleAppleLogin}
            variant="secondary"
            block
            borderRadius="10"
            height="55"
            fontSize="16"
            title="Sign in with Apple"
            titleProps={{
              style: {
                fontWeight: "600",
              },
            }}
            image={
              <Image
                source={AppleIcon}
                resizeMode="contain"
                style={{
                  width: 14.17,
                  height: 17,
                  marginRight: 8,
                  marginTop: -2,
                }}
              />
            }
            style={{
              marginTop: 5.5,
              marginBottom: 5.5,
            }}
          />
        )}
        <Button
          onPress={() => {
            promptAsync();
          }}
          //  onPress={promptAsync}
          // onPress={handleSignInWithGoogle}
          variant="secondary"
          block
          borderRadius="10"
          height="55"
          fontSize="16"
          title="Sign in with Google"
          titleProps={{
            style: {
              fontWeight: "600",
            },
          }}
          image={
            <Image
              source={GoogleIcon}
              resizeMode="contain"
              style={{
                width: 17,
                height: 17,
                marginRight: 8,
              }}
            />
          }
          style={{
            marginTop: 5.5,
            marginBottom: 5.5,
          }}
        />
        <BottomView>
          <Image source={ZentbaseVectorWhite} style={{ width: 32, height: 32, marginBottom: 10 }} />
          <Text numberOfLines={1} adjustsFontSizeToFit fontSize="32" fontWeight="bold">
            Live Zen, Earn, Repeat
          </Text>
        </BottomView>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <FotterText>
              <FooterTextFlex>
                <Text>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                  style={{ marginLeft: 3 }}
                >
                  <Text color="primary" fontWeight="bold">
                    Sign Up.
                  </Text>
                </TouchableOpacity>
              </FooterTextFlex>
            </FotterText>
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
