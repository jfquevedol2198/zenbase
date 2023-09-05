import React, { useEffect } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";
import { useAuth } from "stores/auth";
import axios from "services/axios";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import giftIcon from "assets/icons/gift.png";

// Styled Component

const Wrapper = styled.View`
  width: 100%;
  height: 100%;
`;

const BackgroundConfetti = styled.Image`
  width: 100%;
  height: 100%;
  top: -35%;
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

const GiftImage = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: 12px;
`;

// SignupBonus (Default)
export default function SignupBonus({ route, navigation }) {
  const { theme } = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const { transactions } = useAuth();

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    (async () => {
      try {
        await axios.post("/payments", {
          amount: 0,
          reason: "SIGNUP_BONUS",
          valid: true,
          premium: true,
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  const onPressClaimToWallet = async () => {
    try {
      await transactions.createWithAmount(0.01, "SIGNUP_REWARD");
      navigation.navigate("ReferFriends");
    } catch (e) {
    
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
        {/* <Header>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
          </TouchableOpacity>
        </Header> */}
        <Container style={{ flex: 1 }}>
          <ZentTokenBanner tokens={0.01} usd={0.0} />
          <InfoWrapper>
            <InfoBody>
              <GiftImage source={giftIcon} resizeMode="contain" />
              <Text numberOfLines={1} adjustsFontSizeToFit fontSize="32" fontWeight="bold">
                You've earned it.
              </Text>
              <Text numberOfLines={1} adjustsFontSizeToFit fontSize="32" fontWeight="bold">
                0.01 ZENT
              </Text>
              <Text fontSize="md" style={{ marginTop: 5 }}>
                Thanks for creating an account!
              </Text>
            </InfoBody>
            <InfoFooter>
              <Button
                borderRadius="10"
                height="55"
                title="Claim"
                block
                onPress={onPressClaimToWallet}
              />
            </InfoFooter>
          </InfoWrapper>
        </Container>
      </Wrapper>
    </Canvas>
  );
}
