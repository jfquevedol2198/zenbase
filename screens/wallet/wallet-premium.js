import React, { useState, useEffect } from "react";
import { Text, Container, Canvas, Button, Box, PremiumCTA, RewardsCTA } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import Constants from "expo-constants";

// Import Images
import BlurImage from "assets/images/cta/blur.png";
import ApplePayImage from "assets/images/cta/apple-pay.png";
import ZentBackground from "assets/images/wallet/zent-bg.png";
import { useAuth } from "stores/auth";

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 190px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const HeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? "12px" : Constants.statusBarHeight + 10 + "px")};
  right: ${(props) => props.theme.spacing.lg};
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

const HeaderImage = styled.Image`
  height: 30px;
  width: 51px;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border-radius: 2px;
`;

const ApplePay = styled.Image`
  width: 62px;
  height: 30px;
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export default function WalletPremium({ navigation }) {
  const [isRedeemButtonEnabled, setIsRedeemButtonEnabled] = useState(false);
  const { walletAmount } = useAuth();

  // Redeem Handler (This will only work if `isRedeemButtonEnabled` is true)
  const redeem = () => {};

  useEffect(() => {
    if (walletAmount > 42) {
      setIsRedeemButtonEnabled(true);
    }
  }, []);

  return (
    <BackgroundImage source={BlurImage}>
      <StatusBar barStyle="light-content" />
      <HeaderButtons>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text fontWeight="600">Done</Text>
        </TouchableOpacity>
      </HeaderButtons>
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <HeaderWrapper>
            <HeaderImage source={ZentBackground} resizeMode="cover" />
            <Text style={{ marginBottom: 15 }}>{Number(walletAmount).toFixed(6)} ZENT</Text>
          </HeaderWrapper>
          <PremiumCTA />
        </Container>
        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              {/* <ApplePay source={ApplePayImage} /> */}
              {/* <Button
                style={{ marginTop: 5, marginBottom: 5 }}
                title="Continue ($3.99 per month)"
                block
                onPress={() => {}}
              /> */}
              <Button
                style={{ marginTop: 3, marginBottom: 3 }}
                title="Redeem 1 month (42 ZENT)"
                variant={isRedeemButtonEnabled ? "secondary" : "disabled"}
                block
                onPress={() => {
                  if (isRedeemButtonEnabled) {
                    redeem();
                  }
                }}
              />
            </FooterFlex>
          </Container>
        </FooterWrapper>
      </SafeAreaView>
    </BackgroundImage>
  );
}
