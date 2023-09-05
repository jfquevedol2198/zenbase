// Import Dependencies
import React, { useState, useEffect, useRef } from "react";
import { Alert, ScrollView, View, Image, Switch, TouchableOpacity, Animated } from "react-native";
import { Text, Container, Canvas, Button, IOSList, SongTile, Box } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5, AntDesign } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import { useAuth } from "stores/auth";
import { CommonActions, useNavigation } from "@react-navigation/native";
import ReactNativeShare from "helpers/react-native-share";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import MiniProfileHeader from "screens/profile/header/mini";

// Import Images

import profileImage from "assets/images/artist.png";
import appleHealthIcon from "assets/icons/apple-health.png";

// Import Profile Header
import ProfileHeader from "screens/profile/header";

// Styled Component
const SwitchList = styled.View`
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.secondaryDark};
  margin-top: 16px;
  width: 100%;
`;

const SwitchMediaFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SwitchImage = styled.Image`
  width: 31px;
  height: 31px;
  margin-right: 10px;
`;

const SwitchWrapper = styled.View`
  height: 55px;
  width: 100%;
  border-radius: 15px;
  background-color: ${(props) => props.theme.color.secondaryDark};
  padding-left: 12px;
  padding-right: 12px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Divider = styled.View`
  height: 0.5px;
  background-color: rgba(172, 178, 155, 0.35);
  width: 95%;
  position: relative;
  left: 5%;
`;

export default function Settings({ route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const { user, updateUser, logout } = useAuth();

  const scrollY = useRef(new Animated.Value(0)).current;

  // States
  const [setting, setSetting] = useState({
    appleHealth: true,
    displayWellnessActivity: true,
    currentWellnessActivity: true,

    hourlyBell: false,
    groundingReminders: false,
    dailyAffirmations: false,
    fullMoon: false,
    newMusicRelease: true,
    invitesToWellness: true,
    passiveEarningSesssion: true,
  });

  const handleSwitch = (key, value) => {
    setSetting({ ...setting, [key]: value });
  };

  // useEffect(() => {
  //   if (user?.renewZenbasePremiumAutomatically != autoRenew) {
  //     updateUser("renewZenbasePremiumAutomatically", autoRenew);
  //   }
  // }, [autoRenew]);

  const inviteFriend = (message) => {
    const username = user?.username; // Retrieve the username
    // Replace the name placeholder with the username in the invitation message
    const modifiedMessage = message.replace('{name}', username);
    
    ReactNativeShare(
      modifiedMessage,
      () => {
        // Success
      },
      () => {
        // Dismissed
      },
      (err) => {
        // Error
      }
    );
  };

  const signOut = async () => {
    await AsyncStorageLib.removeItem("recents");
    logout();
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const deleteUser = () => {
    navigation.navigate("DeleteUser");
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.color.background }}>
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader
            editable
            profilePicture={profileImage}
            route={route}
            navigation={navigation}
            backButtonText="Profile"
          />
          <Container style={{ paddingBottom: 70 }}>
            <Text fontSize="24" fontWeight="600" style={{ marginTop: 27, marginLeft: 15 }}>
              Settings
            </Text>
            <SwitchList>
              {!user?.isPremium && (
                <>
                  <SwitchWrapper style={{ height: 50 }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("UpgradePremium", {
                          previousScreenName: "Settings",
                        });
                      }}
                    >
                      <Text color="primary" numberOfLines={1} fontWeight="600">
                        Upgrade to Zenbase Premium
                      </Text>
                    </TouchableOpacity>
                  </SwitchWrapper>
                  <Divider />
                </>
              )}

              <SwitchWrapper style={{ height: 50 }}>
                <TouchableOpacity
                  onPress={() => {
                    inviteFriend(
                      `${user?.username} is inviting you to meditate with them. Zenbase is the fastest-growing meditation app with cryptocurrency rewards. \n\nJoin Here: https://apps.apple.com/in/app/zenbase-meditate-to-earn/id1619530022`
                    );
                  }}
                >
                  <Text color="primary" numberOfLines={1} fontWeight="600">
                    Invite Friends
                  </Text>
                </TouchableOpacity>
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper style={{ height: 50 }}>
                <TouchableOpacity>
                  <Text color="primary" numberOfLines={1} fontWeight="600">
                    I have an idea
                  </Text>
                </TouchableOpacity>
              </SwitchWrapper>
            </SwitchList>

            {/*
             **********
             * Accounts
             * ********
             * */}
            <Text fontSize="20" fontWeight="600" style={{ marginTop: 27, marginLeft: 15 }}>
              Account
            </Text>
            <SwitchList>
              {/* Apple Health Toggle */}
              <SwitchWrapper>
                <SwitchMediaFlex>
                  <SwitchImage source={appleHealthIcon} resizeMode="contain" />
                  <Text numberOfLines={1}>Apple Health Mindful Minutes</Text>
                </SwitchMediaFlex>
                <Switch
                  onValueChange={() => {
                    handleSwitch("appleHealth", !setting.appleHealth);
                  }}
                  value={setting.appleHealth}
                />
              </SwitchWrapper>
              <Divider />
              {/* Display Wellness Activity Toggle */}
              <SwitchWrapper>
                <Text numberOfLines={1}>Display Wellness Activity on Profile</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("displayWellnessActivity", !setting.displayWellnessActivity);
                  }}
                  value={setting.displayWellnessActivity}
                />
              </SwitchWrapper>
              <Divider />
              {/* Wellness Activity Toggle */}
              <SwitchWrapper>
                <Text numberOfLines={1}>Allow Current Wellness Activity</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("currentWellnessActivity", !setting.currentWellnessActivity);
                  }}
                  value={setting.currentWellnessActivity}
                />
              </SwitchWrapper>
            </SwitchList>
            <Text
              fontSize="14"
              color="description"
              style={{ marginTop: 8, paddingLeft: 15, paddingRight: 15 }}
            >
              People on your Earning Team may see you doing wellness activities in real time.
            </Text>

            {/*
             ***************
             * Notifications
             * *************
             * */}
            <Text fontSize="20" fontWeight="600" style={{ marginTop: 27, marginLeft: 15 }}>
              Notifications
            </Text>
            <SwitchList>
              <SwitchWrapper>
                <Text numberOfLines={1}>Hourly Bell of Mindfulness</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("hourlyBell", !setting.hourlyBell);
                  }}
                  value={setting.hourlyBell}
                />
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper>
                <Text numberOfLines={1}>Grounding Reminders</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("groundingReminders", !setting.groundingReminders);
                  }}
                  value={setting.groundingReminders}
                />
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper>
                <Text numberOfLines={1}>Daily Affirmations</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("dailyAffirmations", !setting.dailyAffirmations);
                  }}
                  value={setting.dailyAffirmations}
                />
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper>
                <Text numberOfLines={1}>Full Moon Alerts</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("fullMoon", !setting.fullMoon);
                  }}
                  value={setting.fullMoon}
                />
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper>
                <Text numberOfLines={1}>New Music Releases</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("newMusicRelease", !setting.newMusicRelease);
                  }}
                  value={setting.newMusicRelease}
                />
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper>
                <Text numberOfLines={1}>Invites to Wellness Activities</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("invitesToWellness", !setting.invitesToWellness);
                  }}
                  value={setting.invitesToWellness}
                />
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper>
                <Text numberOfLines={1}>Passive Earning Sessions</Text>
                <Switch
                  onValueChange={() => {
                    handleSwitch("passiveEarningSesssion", !setting.passiveEarningSesssion);
                  }}
                  value={setting.passiveEarningSesssion}
                />
              </SwitchWrapper>
            </SwitchList>

            <SwitchList style={{ marginTop: 40 }}>
              <SwitchWrapper style={{ height: 50 }}>
                <TouchableOpacity onPress={signOut}>
                  <Text numberOfLines={1}>Sign Out</Text>
                </TouchableOpacity>
              </SwitchWrapper>
              <Divider />
              <SwitchWrapper style={{ height: 50 }}>
                <TouchableOpacity onPress={deleteUser}>
                  <Text color="red" numberOfLines={1}>
                    Delete Account
                  </Text>
                </TouchableOpacity>
              </SwitchWrapper>
            </SwitchList>
          </Container>
        </Animated.ScrollView>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          opacity: scrollY.interpolate({
            inputRange: [120, 200],
            outputRange: [0, 1],
          }),
          zIndex: scrollY.interpolate({
            inputRange: [120, 200],
            outputRange: [-1, 1],
          }),
        }}
      >
        <MiniProfileHeader
          profilePicture={profileImage}
          route={route}
          navigation={navigation}
          backButtonText={"Profile"}
        />
      </Animated.View>
    </>
  );
}
