import React from "react";
import { Text, Container, Canvas, Button, Box, PremiumCTA } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import Constants from "expo-constants";

// Import Images
import BlurImage from "assets/images/cta/blur.png";
import ZentBackground from "assets/images/wallet/zent-bg.png";
// import { ApplePayButton, useApplePay } from "@stripe/stripe-react-native";
import { useAuth } from "stores/auth";

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 120px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

export default function PremiumTrailEnded({ navigation }) {
  // const { isApplePaySupported } = useApplePay();
  const { walletAmount } = useAuth();

  return (
    <BackgroundImage source={BlurImage}>
      <StatusBar barStyle="light-content" />
      {/* <HeaderButtons>
                <TouchableOpacity onPress={() => {}}>
                    <Text fontWeight='600'>Done</Text>
                </TouchableOpacity>
            </HeaderButtons> */}
      <SafeAreaView style={{ flex: 1 }}>
        <Container style={{ flex: 1 }}>
          <HeaderWrapper>
            {/* <HeaderImage source={ZentBackground} resizeMode="cover" />
            <Text style={{ marginBottom: 15 }}>
              {Number(walletAmount).toFixed(6)} Zent
            </Text> */}
          </HeaderWrapper>
          <Text fontSize="22" style={{ marginBottom: 25 }} fontWeight="600" color="header90">
            Your trial of Zenbase Premium has ended.
          </Text>
          <PremiumCTA onPress={() => {}} />
        </Container>
        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
              >
                <Text style={{ marginTop: 20, marginBottom: 5 }}>Maybe later</Text>
              </TouchableOpacity>
            </FooterFlex>
          </Container>
        </FooterWrapper>
      </SafeAreaView>
    </BackgroundImage>
  );
}
