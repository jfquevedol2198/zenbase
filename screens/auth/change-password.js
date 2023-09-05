import React, { useState, useEffect, useRef } from "react";
import { Text, Container, Canvas, Button, TextInput } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "services/axios";

// Import Images
import ZentbaseLogoWhite from "assets/images/zenbase-full-white-logo.png";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 12px;
`;

const ZenbaseLogo = styled.Image`
  width: 219px;
  height: 60px;
  margin-bottom: 35px;
`;

const InputWrapper = styled.View`
  width: 100%;
  margin-top: 40px;
`;

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 8px;
  border-radius: 7.5px;
  background-color: ${(props) => props.theme.color.hud};
  color: ${(props) => props.theme.color.white};
  margin-top: 5px;
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

const BottomPadding = styled.View`
  padding-top: 60px;
`;

export default function LoginForm({ route, navigation }) {
  const { changePasswordToken } = route.params;
  const { theme } = useTheme();

  const [error, setError] = useState("");

  const confirmPasswordInput = useRef();

  // States
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Input Handler
  const updateInput = (setState, value) => {
    setState(value);
  };

  // Change Password Handler
  const changePasswordHandler = async () => {
    try {
      if (validatePassword()) {
        const {
          data: { data },
        } = await axios.post("/auth/change-password", {
          newPassword,
          changePasswordToken,
        });

        alert(data.msg);
        navigation.goBack();
        navigation.goBack();
        navigation.goBack();
      }
    } catch (e) {
      setError(e?.response?.data?.error);
    }
  };

  const validatePassword = () => {
    if (newPassword == "" && confirmPassword == "") {
      setError("Both fields are required.");
      return false;
    } else if (newPassword != confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }

    return true;
  };

  return (
    <Canvas>
      <Header>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
        </TouchableOpacity>
      </Header>
      <Container
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <ZenbaseLogo source={ZentbaseLogoWhite} />
        <InputWrapper>
          <Text>New Password</Text>
          <TextInput
            StyledComponent={Input}
            onFocusStyle={{
              borderWidth: 1,
              borderColor: "#8f9094",
              borderLeftColor: Boolean(error) ? theme.color.red : "#8f9094",
            }}
            style={{
              ...(Boolean(error) && { borderLeftWidth: 10, borderLeftColor: theme.color.red }),
            }}
            returnKeyType="done"
            placeholder=""
            selectionColor={theme.color.white}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setNewPassword, value)}
            secureTextEntry={true}
            value={newPassword}
            onSubmitEditing={() => {
              if (!(newPassword != "" && confirmPassword != "")) {
                confirmPasswordInput.current.focus();
              }
            }}
          />

          <Text style={{ marginTop: 20 }}>Confirm Password</Text>
          <TextInput
            StyledComponent={Input}
            onFocusStyle={{
              borderWidth: 1,
              borderColor: "#8f9094",
              borderLeftColor: Boolean(error) ? theme.color.red : "#8f9094",
            }}
            style={{
              ...(Boolean(error) && { borderLeftWidth: 10, borderLeftColor: theme.color.red }),
            }}
            returnKeyType="done"
            placeholder=""
            selectionColor={theme.color.white}
            placeholderTextColor={theme.color.secondary}
            onChangeText={(value) => updateInput(setConfirmPassword, value)}
            secureTextEntry={true}
            value={confirmPassword}
            ref={confirmPasswordInput}
          />
        </InputWrapper>

        <InputWrapper
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Text fontWeight="600">{Boolean(error) && error} </Text>
        </InputWrapper>

        <Button
          title="Next"
          block
          style={{ marginTop: 6, marginBottom: 6 }}
          onPress={() => {
            changePasswordHandler();
          }}
        />

        <BottomPadding></BottomPadding>
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <FotterText>
              <FooterTextFlex>
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                    navigation.goBack();
                    navigation.goBack();
                  }}
                >
                  <Text color="primary" fontWeight="bold">
                    Back to log in
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
