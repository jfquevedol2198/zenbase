// Import Dependencies
import React from "react";
import { Platform, TouchableOpacity } from "react-native";
import { Text, Button } from "components";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import { useAuth } from "stores/auth";

// Styled Component
/**
 * **************
 * Profile Header
 * **************
 */
const ProfileHeaderWrapper = styled.ImageBackground`
  background-color: ${(props) => props.theme.color.hud};
  width: 100%;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 80}px;
`;

const ProfileHeaderOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
`;

const ProfileHeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderImageWrapper = styled.View`
  flex-direction: column;
  align-items: center;
`;

const ProfileHeaderImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 50px;
`;

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? "12px" : Constants.statusBarHeight + 10 + "px")};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const ProfileHeaderIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: rgba(247, 248, 250, 0.3);
  justify-content: center;
  align-items: center;
`;

const BackButtonWrapper = styled.View`
  flex-direction: row;
`;

/**
 * **********
 * Components
 * **********
 */

// Profile Header
export default function MiniProfileHeader({
  profilePicture,
  settingButton,
  backButton = true,
  backButtonText = " ",
}) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  let imageSource = typeof profilePicture == "string" ? { uri: profilePicture } : profilePicture;

  const { user } = useAuth();

  if (user.image) {
    imageSource = { uri: user.image };
  }
  return (
    <ProfileHeaderWrapper source={imageSource} blurRadius={Platform.OS == "android" ? 35 : 100}>
      <ProfileHeaderOverlay>
        <ProfileHeaderButtons>
          {/* Back Buttons */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            {backButton && (
              <BackButtonWrapper>
                <Ionicons
                  name="ios-chevron-back"
                  size={24}
                  color={theme.color.white}
                  style={{ marginLeft: 10, top: -5 }}
                />
                <Text>{backButtonText}</Text>
              </BackButtonWrapper>
            )}
          </TouchableOpacity>

          {settingButton && (
            <ProfileHeaderIconWrapper
              style={{ right: 20 }}
              onPress={() => {
                navigation.navigate("Settings");
              }}
            >
              <Ionicons name="settings-sharp" style={{ marginLeft: 1 }} size={16} color="white" />
            </ProfileHeaderIconWrapper>
          )}
        </ProfileHeaderButtons>

        <ProfileHeaderSafeArea>
          <ProfileHeaderImageWrapper>
            <ProfileHeaderImage source={imageSource} resizeMode="cover" />
            <Text style={{ marginTop: 4 }} color="rgba(247, 248, 250, 0.6)">
              {user.name}
            </Text>
          </ProfileHeaderImageWrapper>
        </ProfileHeaderSafeArea>
      </ProfileHeaderOverlay>
    </ProfileHeaderWrapper>
  );
}
