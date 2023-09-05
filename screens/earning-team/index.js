import React, { useState, useRef } from "react";
import {
  Container,
  Canvas,
  Text,
  Button,
  NavigationPaddingInsetsWithSafeArea,
  AnimatedHeaderView,
  Box,
  Header,
  StackNavigatorTabBar,
} from "components";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Animated,
  Alert,
} from "react-native";
import { useTheme } from "stores/theme";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import personAddIcon from "assets/icons/person-add.png";
import friendsIcon from "assets/icons/friends.png";
import checkIcon from "assets/icons/check.png";
import closeIcon from "assets/icons/close.png";
import joinGroupIcon from "assets/icons/join-group.png";
import profileImage from "assets/images/artist.png";
import zenbaseIcon from "assets/icon.png";

const HeaderWrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const HeaderTitle = styled.View`
  width: 107%;
  height: 100%;
  position: absolute;
  top: 5px;
  left: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderIconWrapper = styled.TouchableOpacity`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.hud};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const HeaderIcon = styled.Image`
  width: 18px;
  height: 18px;
`;

const AboutWrapper = styled.View`
  width: 100%;
  height: 130px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const FriendsImage = styled.Image`
  width: 115px;
  height: 130px;
`;

const AboutContent = styled.View`
  height: 100%;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 15px;
`;

const ListWrapper = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.color.secondaryDark};
  border-radius: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 15px;
`;

const ListInnerFlex = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  display: flex;
`;

const ListTextWrapper = styled.View`
  width: 61%;
  margin-left: 8px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

const UserImage = styled.Image`
  border-radius: 50px;
  width: 42px;
  height: 42px;
  border-width: 1.75px
  border-color: rgba(51, 51, 51, 0.9);
  margin-left: 5px; 
  margin-right: 5px;
`;

const Icon = styled.Image`
  width: 16px;
  height: 16px;
`;

const ZenbaseLogo = styled.Image`
  border-radius: 100px;
  width: 25px;
  height: 25px;
  margin-left: 8px;
`;

const JoinNowButtton = styled.TouchableOpacity`
  height: 26px;
  border-radius: 15px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: ${(props) => props.theme.color.primary};
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 15px;
`;

const InvitedYou = () => {
  return (
    <>
      {/* Invited You Section */}
      <Text fontSize="24" fontWeight="600" style={{ marginTop: 30, marginBottom: 20 }}>
        Invited You
      </Text>

      <ListWrapper style={{ height: 80 }}>
        <ListInnerFlex>
          <UserImage source={profileImage} />
          <ListTextWrapper>
            <Text numberOfLines={1} adjustsFontSizeToFit color="description">
              Last used Zenbase 10AM
            </Text>
            <Text numberOfLines={1} fontSize="20" fontWeight="600">
              Zenuser 42069
            </Text>
          </ListTextWrapper>
        </ListInnerFlex>

        <ListInnerFlex>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Icon source={checkIcon} resizeMode="contain" style={{ width: 22 }} />
          </TouchableOpacity>
          <TouchableOpacity style={{ marginRight: 20 }}>
            <Icon source={closeIcon} resizeMode="contain" />
          </TouchableOpacity>
        </ListInnerFlex>
      </ListWrapper>
    </>
  );
};

const YourTeam = () => {
  return (
    <>
      <ListWrapper style={{ height: 130 }}>
        <ListTextWrapper>
          <Text numberOfLines={1} adjustsFontSizeToFit color="description">
            Last did yoga 10AM
          </Text>
          <Text numberOfLines={1} fontSize="20" fontWeight="600">
            Zenuser 42069
          </Text>
        </ListTextWrapper>
        <UserImage source={profileImage} style={{ width: 80, height: 80 }} />
      </ListWrapper>

      <ListWrapper style={{ height: 130 }}>
        <ListTextWrapper>
          <Text numberOfLines={1} adjustsFontSizeToFit color="green">
            Doing yoga now
          </Text>
          <ListInnerFlex>
            <Text numberOfLines={1} fontSize="20" fontWeight="600">
              Ludvig Cimbrellius
            </Text>
            <ZenbaseLogo source={zenbaseIcon} resizeMode="contain" />
          </ListInnerFlex>
          <JoinNowButtton onPress={() => {}}>
            <Icon
              source={joinGroupIcon}
              style={{ heigth: 14, width: 21, marginRight: 5 }}
              resizeMode="contain"
            />
            <Text fontWeight="bold">JOIN NOW</Text>
          </JoinNowButtton>
        </ListTextWrapper>
        <UserImage source={profileImage} style={{ width: 80, height: 80 }} />
      </ListWrapper>
    </>
  );
};

// EarningTeam Component (Default)
export default function EarningTeam({ route, navigation }) {
  const [isYourTeam, setIsYourTeam] = useState(false);
  const { previousScreenName } = route.params;
  return (
    <>
      <AnimatedHeaderView
        header={
          <Header
            title={"Earning Team"}
            previousScreenName={previousScreenName}
            addon={
              <HeaderIconWrapper onPress={() => {}}>
                <HeaderIcon source={personAddIcon} resizeMode="contain" />
              </HeaderIconWrapper>
            }
          />
        }
        inputRange={[10, 50]}
      >
        <Header previousScreenName={previousScreenName} />
        <Container>
          <Text fontSize="30" fontWeight="bold">
            Earning Team
          </Text>

          <AboutWrapper>
            <FriendsImage source={friendsIcon} resizeMode="contain" />
            <AboutContent>
              <Text color="description">Invite or join friends</Text>
              <Text fontSize="20" fontWeight="600">
                Earn 10% more ZENT together on any activity
              </Text>
            </AboutContent>
          </AboutWrapper>

          {isYourTeam ? <YourTeam /> : <InvitedYou />}

          <Box h={`${NavigationPaddingInsetsWithSafeArea() + 75}px`} />
        </Container>
      </AnimatedHeaderView>

      <BlurView
        style={{
          position: "absolute",
          bottom: NavigationPaddingInsetsWithSafeArea(),
          left: 0,
          padding: 20,
          width: "100%",
        }}
        intensity={200}
        tint="dark"
      >
        <Button
          borderRadius="10"
          height="55"
          title={isYourTeam ? "Ping inactive and start" : "Start my own team"}
          block
          variant="primary"
          onPress={() => {
            Alert.alert(
              "Join Earning Team?",
              "Once you join an Earning Team you cannot leave. \n Are you sure you want to continue?",
              [
                {
                  text: "No",
                  onPress: () => {},
                },
                { text: "Yes", onPress: () => setIsYourTeam(true) },
              ],
              {
                userInterfaceStyle: "dark",
              }
            );
          }}
        />
      </BlurView>
      <StackNavigatorTabBar />
    </>
  );
}
