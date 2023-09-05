import React from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

// Import Images
import rewardsLogo from "assets/logos/rewards.png";
import rewardsEmojis from "assets/icons/rewards-emojis.png";
import rewardsProcess from "assets/icons/rewards-process.png";
import zentLogo from "assets/logos/zent-coin.png";

const WINDOW_WIDTH = Dimensions.get("window").width;

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

const RewardsImage = styled.Image`
  width: 120px;
  height: 30px;
  margin-bottom: 13px;
`;

const RewardsEmojis = styled.Image`
  height: 56%;
`;

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const InfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
`;

const SemiCircle = styled.View`
  width: ${WINDOW_WIDTH * 2}px;
  height: ${WINDOW_WIDTH * 2}px;
  border-radius: ${WINDOW_WIDTH * 2}px;
  position: absolute;
  border-width: 1px;
  border-color: rgba(172, 178, 155, 0.5);
  left: -50%;
  top: 50%;
`;

const RewardProcessImage = styled.Image`
  width: 90%;
  height: 70%;
  position: absolute;
  top: 15%;
  left: 10%;
`;

const RowFlex = styled.View`
  flex-direction: row;
`;

// ReferFriend (Default)
export default function Rewards({ route, navigation }) {
  const onPressNavigateToNextScreen = () => {
    navigation.navigate("SignupBonus");
  };

  return (
    <Canvas>
      <SemiCircle />
      <RewardProcessImage source={rewardsProcess} resizeMode="contain" />
      <Container style={{ flex: 1 }}>
        {/* <HeaderWrapper>
          <TouchableOpacity onPress={onPressNavigateToNextScreen}>
            <Text fontSize="16">Skip</Text>
          </TouchableOpacity>
        </HeaderWrapper> */}
        <InfoWrapper>
          <InfoBody>
            <RewardsEmojis source={rewardsEmojis} resizeMode="contain" />
          </InfoBody>
          <InfoFooter>
            <RowFlex>
              <RewardsImage source={rewardsLogo} resizeMode="contain" />
              <Text style={{ marginTop: 3 }} fontSize="21" color="rgba(247, 248, 250, 0.75)">
                {" "}
                (Coming Soon)
              </Text>
            </RowFlex>
            <Text
              numberOfLines={2}
              adjustsFontSizeToFit
              fontSize="32"
              fontWeight="bold"
              style={{ marginBottom: 12 }}
            >
              Redeem Zentoken for Prizes.
            </Text>
            <Text fontSize="16" style={{ marginBottom: 25 }}>
              Meditate to earn and redeem for Zenbase Premium, wellness products, NFTs, and more.
            </Text>
            <Button
              borderRadius="10"
              height="55"
              title="Earn for free"
              block
              onPress={onPressNavigateToNextScreen}
            />
          </InfoFooter>
        </InfoWrapper>
      </Container>
    </Canvas>
  );
}
