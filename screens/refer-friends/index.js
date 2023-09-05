import React from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import { ReactNativeShare } from "helpers";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

// Import Icons
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "stores/auth";
import { CommonActions } from "@react-navigation/native";

// Import Images
import rewardsLogo from "assets/logos/rewards.png";
import friendsIcon from "assets/icons/friends.png";
import zentLogo from "assets/logos/zent-coin.png";

// Styled Component
const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 5px;
`;

const HeaderImageWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderImage = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: 7px;
`;

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Rewards = styled.Image`
  width: 120px;
  height: 30px;
  margin-bottom: 13px;
`;

const Friends = styled.Image`
  width: 223px;
  height: 250px;
`;

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
`;

// ReferFriend (Default)
export default function ReferFriends({ route, navigation }) {
  const { user } = useAuth();

  const onPressNavigateToNextScreen = () => {
    navigation.navigate("PremiumTrial");
  };

  // Invite Friend (React Native Share)
  const inviteFriend = (message) => {
    ReactNativeShare(
      message,
      onPressNavigateToNextScreen,
      () => {
        // Dismissed
      },
      (err) => {
        // Error
      }
    );
  };
  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <HeaderWrapper>
          <HeaderImageWrapper>
            <Box w="35px" />
          </HeaderImageWrapper>
          <HeaderImageWrapper>
            <HeaderImage source={zentLogo} resizeMode="contain" />
            <Text fontSize="14">0.01 ZENT</Text>
          </HeaderImageWrapper>
          <TouchableOpacity onPress={onPressNavigateToNextScreen}>
            <Text fontWeight="600" fontSize="16">
              Skip
            </Text>
          </TouchableOpacity>
        </HeaderWrapper>
        <InfoWrapper>
          <InfoBody>
            <Friends source={friendsIcon} resizeMode="contain" />
          </InfoBody>
          <InfoFooter>
            <Rewards source={rewardsLogo} resizeMode="contain" />
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              fontSize="36"
              fontWeight="bold"
              style={{ marginBottom: 12 }}
            >
              Earn more with friends.
            </Text>
            <Text numberOfLines={1} adjustsFontSizeToFit fontSize="20" style={{ marginBottom: 25 }}>
              Listen with your circle of friends to earn more.
            </Text>
            <Button
              height="55"
              title="Invite Friends"
              block
              onPress={() =>
                inviteFriend(
                  `${user?.name} is inviting you to meditate with them. Zenbase is the fastest-growing meditation app with cryptocurrency rewards. \n\nJoin Here: https://apps.apple.com/in/app/zenbase-meditate-to-earn/id1619530022`
                )
              }
            />
          </InfoFooter>
        </InfoWrapper>
      </Container>
    </Canvas>
  );
}
