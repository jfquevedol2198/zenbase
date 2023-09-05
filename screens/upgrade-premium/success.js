import React, { useEffect } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions } from "react-native";
import { CommonActions } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";
import { AntDesign } from "@expo/vector-icons";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import PremiumDescriptionImage from "assets/images/cta/premium-features.png";
import PremiumLogo from "assets/logos/premium.png";
import giftIcon from "assets/icons/gift.png";

// Styled Component

const GiftImage = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: 12px;
`;
const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const BackgroundConfetti = styled.Image`
  width: 100%;
  height: 100%;
  top: -60%;
  position: absolute;
`;

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 25px;
`;

const InfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
`;

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: ${(props) => props.theme.spacing.sm};
`;

const DescriptionWrapper = styled.View`
  width: 100%;
  height: 350px;
  background-color: #1e1f20;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const Description = styled.Image`
  width: 267px;
  height: 260px;
`;

const Logo = styled.Image`
  width: 254px;
  height: 60px;
  margin-bottom: 43px;
`;

const LogoWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

// PremiumTrial (Default)
export default function UpgradePremiumSuccessfully({ route, navigation }) {
  const { theme } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  return (
    <Canvas>
      <Wrapper>
        {/* <BackgroundConfetti source={ConfettiImage} resizeMode="cover" /> */}
        <ConfettiCannon
          colors={["#974EBC", "#6B26FF", "#281830", "#7C588F", "#CD94EB"]}
          count={100}
          fallSpeed={2000}
          origin={{ x: windowWidth * 0.5, y: windowHeight - 100 }}
          fadeOut
        />
        <Container style={{ flex: 1 }}>
          <LogoWrapper>
            <Logo source={PremiumLogo} resizeMode="contain" />
          </LogoWrapper>
          <InfoWrapper>
            <InfoBody>
              <AntDesign
                name="heart"
                size={32}
                color={theme.color.white}
                style={{ marginBottom: 10 }}
              />
              <Text numberOfLines={1} adjustsFontSizeToFit fontSize="30" fontWeight="bold">
                You are now a
              </Text>
              <Text numberOfLines={1} adjustsFontSizeToFit fontSize="30" fontWeight="bold">
                Zenbase Premium user!
              </Text>
              <Text fontSize="md" style={{ marginTop: 5 }}>
                Zenbase Premium is the ultimate meditation-crypto rewards package on the market.
              </Text>
            </InfoBody>
            <InfoFooter>
              <Button
                height="55"
                title="Done"
                block
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </InfoFooter>
          </InfoWrapper>
        </Container>
      </Wrapper>
    </Canvas>
  );
}
