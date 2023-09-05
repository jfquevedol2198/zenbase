import styled from "styled-components/native";
import { TouchableOpacity, View, ScrollView } from "react-native";
import { Text, Container, Button } from "components";
import { useTheme } from "stores/theme";
import axios from "services/axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

// Import Icons
import { Ionicons, AntDesign } from "@expo/vector-icons";

// Import Images
import ZentBackground from "assets/images/wallet/zent-bg.png";

import { useAuth } from "stores/auth";

const HeaderImage = styled.Image`
  height: 30px;
  width: 51px;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border-radius: 2px;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 30;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const HeaderWrapper = styled.ImageBackground`
  width: 100%;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 80}px;
`;

const HeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderImageWrapper = styled.View`
  flex-direction: column;
  align-items: center;
`;

const HeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? "12px" : Constants.statusBarHeight + 10 + "px")};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const HeaderLeftText = styled.Text`
  align-self: center;
  text-align: center;
  color: ${(props) => props.theme.color.primary};
`;

const DeleteMyAccountText = styled.Text`
  margin-bottom: 5;
  margin-top: 10;
  width: 100%;
  text-align: center;
  align-self: center;
`;

export default function DeleteAccount({ route, navigation }) {
  const { walletAmount, user } = useAuth();
  const { theme } = useTheme();

  const deleteAccount = async () => {
    try {
      const { data } = await axios.delete(`/admin/users/${user._id}`);
      if (data.data === "success") {
        await AsyncStorageLib.removeItem("recents");
        await AsyncStorageLib.removeItem("@zenbase_user");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.color.black }}>
      <HeaderWrapper>
        <HeaderButtons>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="ios-chevron-back"
                size={32}
                color={theme.color.primary}
                style={{ marginLeft: 10 }}
              />
              <HeaderLeftText>Settings</HeaderLeftText>
            </View>
          </TouchableOpacity>
        </HeaderButtons>
        <HeaderSafeArea>
          <HeaderImageWrapper>
            <HeaderImage source={ZentBackground} resizeMode="cover" />
            <Text style={{ marginBottom: 15 }}>{Number(walletAmount).toFixed(6)} Zent</Text>
          </HeaderImageWrapper>
        </HeaderSafeArea>
      </HeaderWrapper>

      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
        <Container style={{ flex: 1, justifyContent: "center" }}>
          <AntDesign name="delete" size={40} color="white" style={{ alignSelf: "center" }} />

          <Text
            fontSize="30"
            style={{
              marginBottom: 5,
              marginTop: 10,
              width: "100%",
              textAlign: "center",
              alignSelf: "center",
            }}
            fontWeight="bold"
            color="header90"
          >
            Delete My Account
          </Text>
          <Text
            fontSize="20"
            style={{
              marginBottom: 25,
              width: "100%",
              textAlign: "center",
              alignSelf: "center",
            }}
            fontWeight="600"
            color="header90"
          >
            There is no recovery method to get back earned zentoken once your account is deleted.
            your zentoken will be recirculated to zenbase for others to earn.
          </Text>
        </Container>
      </ScrollView>

      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Text style={{ marginBottom: 10 }}>For billing questions email {user.email}</Text>
            <Button
              title="Delete my account and Zentoken"
              variant="secondary"
              block
              onPress={() => {
                deleteAccount();
              }}
            />
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </View>
  );
}
