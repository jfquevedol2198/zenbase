import React, { useState, useRef } from "react";
import {
  Alert,
  Container,
  Canvas,
  Text,
  Button,
  ZentTokenBanner,
  Box,
  NavigationPadding,
  NavigationPaddingInsetsWithSafeArea,
} from "components";
import styled from "styled-components/native";
import { ScrollView, Image, Animated, Platform } from "react-native";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import Images
import zentBackground from "assets/images/wallet/zent-bg.png";

import wallpaper1 from "assets/images/wallpapers/wallpaper-1.png";
import wallpaper2 from "assets/images/wallpapers/wallpaper-2.png";
import wallpaper3 from "assets/images/wallpapers/wallpaper-3.png";
import wallpaper4 from "assets/images/wallpapers/wallpaper-4.png";
import { useTheme } from "stores/theme";

// Styled Components

/**
 * *******************
 * Wallet History List
 * *******************
 */
const WalletHistoryList = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md};
  padding-left: ${(props) => props.theme.spacing.xxl};
  padding-right: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => props.theme.color.hud};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

const WalletHistoryListText = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const WalletHistoryListThumbnail = styled.Image`
  width: 78px;
  height: 78px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

/**
 * *****************
 * WalletPage Header
 * *****************
 */
const HeaderWrapper = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.statusBarHeight}px;
`;

const HeaderImage = styled.Image`
  height: 30px;
  width: 51px;
  margin-bottom: ${(props) => props.theme.spacing.sm};
  border-radius: 2px;
`;

/**
 * **********
 * Components
 * **********
 */

// TotalEarnings (Default)
export default function TotalEarnings({ route, navigation }) {
  const { theme } = useTheme();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { walletAmount } = useAuth();

  const ZentBanner = <ZentTokenBanner tokens={Number(walletAmount || 0).toFixed(6)} usd={0} />;

  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Animated.ScrollView
          style={{ width: "100%" }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {ZentBanner}

          <Text
            fontSize="20"
            fontWeight="600"
            style={{
              marginTop: 20,
              marginBottom: 10,
              width: "100%",
              textAlign: "center",
            }}
          >
            You’ve earned the maximum today
          </Text>
          <Text fontSize="lg" style={{ marginBottom: 20, width: "100%", textAlign: "center" }}>
            3 hour earning limit
          </Text>

          {/* Wallet History List */}
          {false && (
            <>
              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    5 minutes • 0.01 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Our Purpose Has Presence
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Damon
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper1} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    10 minutes • 0.02 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Move Mountain
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Super Seeker
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper2} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    5 minutes • 0.01 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Let Go
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Freestyle
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper3} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    15 minutes • 0.03 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Wisdom of The Ancients
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Master Chadd
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper4} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    15 minutes • 0.03 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Wisdom of The Ancients
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Master Chadd
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper1} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    15 minutes • 0.03 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Wisdom of The Ancients
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Master Chadd
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper2} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    15 minutes • 0.03 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Wisdom of The Ancients
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Master Chadd
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper3} resizeMode="cover" />
              </WalletHistoryList>

              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1} color="primary">
                    15 minutes • 0.03 ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                    Wisdom of The Ancients
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                    Master Chadd
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail source={wallpaper4} resizeMode="cover" />
              </WalletHistoryList>
            </>
          )}
          {/* Wallet History List - End*/}
          <Box h="75px" />
        </Animated.ScrollView>
      </Container>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: scrollY.interpolate({
            inputRange: [100, 150],
            outputRange: [0, 1],
          }),
        }}
      >
        <BlurView
          intensity={200}
          style={{
            width: "100%",
            height: (Platform.OS == "ios" ? Constants.statusBarHeight : 15) + 60,
            paddingBottom: Platform.OS == "android" ? 5 : 0,
          }}
          tint="dark"
        >
          <HeaderWrapper>
            <HeaderImage source={zentBackground} resizeMode="cover" />
            <Text style={{ marginBottom: 15 }}>{ZentBanner.props.tokens} Zent</Text>
          </HeaderWrapper>
        </BlurView>
      </Animated.View>
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: 100,
          width: "100%",
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: theme.color.informationBackground,
          paddingLeft: 20,
          paddingRight: 20,
          paddingTop: 20,
        }}
        intensity={200}
        tint="dark"
      >
        <Button
          title="Done"
          block
          variant="primary"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </BlurView>
    </Canvas>
  );
}
