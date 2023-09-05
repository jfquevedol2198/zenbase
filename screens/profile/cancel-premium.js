import React, { useState } from "react";
import { Text, Container, Canvas, Button, Box, PremiumCTA, RewardsCTA } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { SafeAreaView, TouchableOpacity, StatusBar } from "react-native";
import Constants from "expo-constants";

// Import Images
import BlurImage from "assets/images/cta/blur.png";
import ZentBackground from "assets/images/wallet/zent-bg.png";
import axios from "services/axios";
import { useAuth } from "stores/auth";

const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
  flex: 1;
`;

const FooterWrapper = styled.View`
  width: 100%;
  height: 140px;
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

export default function CancelPremium({ navigation }) {
  const [isCanceled, setIsCanceled] = useState(false);

  const { walletAmount } = useAuth();

  const cancelSubscription = async () => {
    await axios.put("/auth/cancel-premium");
    setIsCanceled(true);
  };

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
            <Text style={{ marginBottom: 15 }}>{Number(walletAmount).toFixed(6)} Zent</Text> */}
          </HeaderWrapper>
          <Text
            fontSize="22"
            style={{ marginBottom: 25, width: "100%", textAlign: "center" }}
            fontWeight="600"
            color="header90"
          >
            {isCanceled
              ? "Your subscription has been canceled"
              : "Are you sure you want to cancel?"}
          </Text>
          <PremiumCTA />
        </Container>
        <FooterWrapper>
          <Container style={{ flex: 1 }}>
            <FooterFlex>
              {isCanceled ? (
                <Button
                  style={{ marginTop: 3, marginBottom: 3 }}
                  title="Done"
                  variant="secondary"
                  block
                  onPress={() => {
                    navigation.goBack();
                  }}
                />
              ) : (
                <>
                  <Button
                    style={{ marginTop: 5, marginBottom: 5 }}
                    title="No, keep my subscription"
                    block
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                  <Button
                    style={{ marginTop: 3, marginBottom: 3 }}
                    title="Yes, I want to cancel"
                    variant="secondary"
                    block
                    onPress={cancelSubscription}
                  />
                </>
              )}
            </FooterFlex>
          </Container>
        </FooterWrapper>
      </SafeAreaView>
    </BackgroundImage>
  );
}
