// Import Dependencies
import React from "react";
import { Dimensions, Platform, TouchableOpacity, View } from "react-native";
import { Text, Button } from "components";
import styled from "styled-components/native";
import { Ionicons, Entypo } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useAuth } from "stores/auth";

// Import Images
import ZenbaseWhiteVector from "assets/vectors/zenbase-white.png";
import { useTheme } from "styled-components";

// Styled Component
/**
 * **************
 * Profile Header
 * **************
 */
const ProfileHeaderWrapper = styled.ImageBackground`
  background-color: #262626;
  width: 100%;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 270}px;
`;

const ProfileHeaderOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
`;

const ProfileHeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? "15px" : Constants.statusBarHeight + 5 + "px")};
  justify-content: flex-end;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const ProfileHeaderIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: rgba(247, 248, 250, 0.3);
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderEditButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  background-color: rgba(255, 255, 255, 0.35);
  border-radius: 10px;
`;

const PlayTime = styled.View`
  margin-top: 12px;
  flex-direction: row;
`;

const ZenbaseWhiteImage = styled.Image`
  width: 17px;
  height: 17px;
  margin-right: 5px;
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
export default function ProfileHeader({
  profilePicture,
  editable,
  route,
  navigation,
  backButtonText = "",
}) {
  let imageSource = typeof profilePicture == "string" ? { uri: profilePicture } : profilePicture;

  const { user } = useAuth();
  const theme = useTheme();

  if (user.image) {
    imageSource = { uri: user.image };
  }

  return (
    <ProfileHeaderWrapper source={imageSource} blurRadius={Platform.OS == "android" ? 35 : 100}>
      <ProfileHeaderOverlay>
        <ProfileHeaderButtons style={[editable ? { justifyContent: "flex-start" } : {}]}>
          {editable ? (
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={{ marginLeft: 10 }}
            >
              <BackButtonWrapper>
                <Ionicons name="ios-chevron-back" size={26} color={theme.color.white} />
                <Text style={{ marginTop: 5 }}>{backButtonText}</Text>
              </BackButtonWrapper>
            </TouchableOpacity>
          ) : (
            <>
              {/* <ProfileHeaderIconWrapper style={{ right: 28 }}>
              <Ionicons name="ios-add" size={24} color="white" style={{ marginLeft: 3 }} />
            </ProfileHeaderIconWrapper> */}

              <ProfileHeaderIconWrapper
                style={{ right: 20 }}
                onPress={() => {
                  navigation.navigate("Settings");
                }}
              >
                <Ionicons name="settings-sharp" style={{ marginLeft: 1 }} size={16} color="white" />
              </ProfileHeaderIconWrapper>
            </>
          )}
        </ProfileHeaderButtons>

        <ProfileHeaderSafeArea>
          <ProfileHeaderImage source={imageSource} resizeMode="cover" />
          <Text
            color="rgba(247, 248, 250, 0.75)"
            fontSize="30"
            fontWeight="bold"
            style={{ marginTop: 8 }}
          >
            {user?.name}
          </Text>
          <Text color="rgba(247, 248, 250, 0.35)" fontSize="xl" style={{ marginTop: 8 }}>
            @{user?.username}
          </Text>
          {!editable && (
            <PlayTime>
              <ZenbaseWhiteImage source={ZenbaseWhiteVector} />
              <Text color="white" fontSize="lg">
                {user?.hours || 0} Hour{user?.hours != 1 && "s"}
              </Text>
            </PlayTime>
          )}
          {editable && (
            <ProfileHeaderEditButton
              onPress={() => {
                // navigation.goBack();
                navigation.navigate("EditProfile", { profilePicture: imageSource });
              }}
            >
              <Text color="white" fontSize="14">
                EDIT
              </Text>
            </ProfileHeaderEditButton>
          )}
        </ProfileHeaderSafeArea>
      </ProfileHeaderOverlay>
    </ProfileHeaderWrapper>
  );
}
