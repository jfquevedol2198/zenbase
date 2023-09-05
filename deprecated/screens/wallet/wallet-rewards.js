import React, { useState } from "react";
import { Text, Container, Canvas, Button, Box, PremiumCTA, RewardsCTA } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import Constants from "expo-constants";

// Import Images
import BlurImage from "assets/images/cta/blur.png";
import ZentBackground from "assets/images/wallet/zent-bg.png";

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

export default function WalletRewards({ navigation }) {
  const [isRedeemButtonEnabled, setIsRedeemButtonEnabled] = useState(false);

  // Redeem Handler (This will only work if `isRedeemButtonEnabled` is true)
  const redeem = () => {};

  return (
    <BackgroundImage source={BlurImage}>
      <StatusBar barStyle="light-content" />
      <HeaderButtons>
        <TouchableOpacity onPress={() => {}}>
          <Text fontWeight="600">Done</Text>
        </TouchableOpacity>
      </HeaderButtons>
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <HeaderWrapper>
            <HeaderImage source={ZentBackground} resizeMode="cover" />
            <Text style={{ marginBottom: 15 }}>0.01 Zent</Text>
          </HeaderWrapper>
          <RewardsCTA />
        </Container>
        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              <Button
                style={{ marginTop: 5, marginBottom: 5 }}
                title="Redeem 1 month (42 ZENT)"
                variant={isRedeemButtonEnabled ? "secondary" : "disabled"}
                block
                onPress={() => {
                  if (isRedeemButtonEnabled) {
                    redeem();
                  }
                }}
              />
              <Button
                style={{ marginTop: 3, marginBottom: 3 }}
                title="Zenbase Premium"
                block
                onPress={() => {}}
              />
            </FooterFlex>
          </Container>
        </FooterWrapper>
      </SafeAreaView>
    </BackgroundImage>
  );
}
