import React, { useEffect } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions } from "react-native";
import { CommonActions } from "@react-navigation/native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import PremiumDescriptionImage from "assets/images/cta/premium-features.png";
import PremiumLogo from "assets/logos/premium.png";

// Styled Component
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
  align-items: center;
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

// PremiumTrial (Default)
export default function PremiumTrial({ route, navigation }) {
  const { theme } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const navigateToHome = async () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "App" }],
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

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
          <InfoWrapper>
            <InfoBody>
              <Logo source={PremiumLogo} resizeMode="contain" />
              <Text
                fontWeight="600"
                fontSize="22"
                style={{ textAlign: "center", marginBottom: 45 }}
              >
                You've received 1 week of Zenbase Premium to get started!
              </Text>
              <DescriptionWrapper>
                <Description source={PremiumDescriptionImage} resizeMode="contain" />
              </DescriptionWrapper>
            </InfoBody>
            <InfoFooter>
              <Button height="55" title="Start exploring" block onPress={navigateToHome} />
            </InfoFooter>
          </InfoWrapper>
        </Container>
      </Wrapper>
    </Canvas>
  );
}
