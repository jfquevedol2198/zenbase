import React, { useState, useRef, useEffect } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

// Import Icons
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Import Images
import zentBackground from "assets/images/wallet/zent-bg.png";

// import wallpaper1 from "assets/images/wallpapers/wallpaper-1.png";
// import wallpaper2 from "assets/images/wallpapers/wallpaper-2.png";
// import wallpaper3 from "assets/images/wallpapers/wallpaper-3.png";
// import wallpaper4 from "assets/images/wallpapers/wallpaper-4.png";
import { useTheme } from "stores/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "stores/auth";
import { useCallback } from "react";

/**
 * *********************************************
 * Wallet Information (Refer a friend & History)
 * *********************************************
 */
const WalletInfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const WalletInfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const WalletInfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
`;

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

const WalletHistoryListEmpty = styled.View`
  width: 100%;
  background-color: ${(props) => props.theme.color.hud}B3;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  position: absolute;
  z-index: -1;
  left: ${(props) => props.theme.spacing.xxl};
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

const transactionListenDuration = (transaction) => {
  const seconds = Number(transaction.amount / transaction.appreciatedFor) || 1;
  const minutes = Math.ceil(seconds / 60) + 5;
  return `${minutes} min`;
};

/**
 * **********
 * Components
 * **********
 */
// History Component
function History({ ZentBanner }) {
  const { theme } = useTheme();
  const { user, zenTransactions, fetchTransactions } = useAuth();
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <>
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
            fontSize="18"
            fontWeight="600"
            style={{ marginTop: 10, marginBottom: 10, marginLeft: 5 }}
          >
            Your Activity
          </Text>

          {/* Wallet History List */}
          {zenTransactions
            .filter((transaction) => transaction.type == "SONG_MINING")
            .slice(0)
            .reverse()
            .map((transaction) => (
              <WalletHistoryList>
                <WalletHistoryListText>
                  <Text fontSize="lg" numberOfLines={1}>
                    {transactionListenDuration(transaction)} •{" "}
                    {Number(transaction.amount).toFixed(6)} ZENT
                  </Text>
                  <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="primary">
                    {transaction.meta?.song}
                  </Text>
                  <Text
                    fontSize="md"
                    numberOfLines={1}
                    style={{ marginTop: 2 }}
                    color="description"
                  >
                    {transaction.meta?.artist}
                  </Text>
                </WalletHistoryListText>
                <WalletHistoryListThumbnail
                  source={{ uri: transaction.meta?.artwork }}
                  resizeMode="cover"
                />
              </WalletHistoryList>
            ))}

          {/* Wallet History List - End*/}

          <NavigationPadding padding={90} />
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
      {false && !user.isPremium && (
        <BlurView
          style={{
            position: "absolute",
            bottom: NavigationPaddingInsetsWithSafeArea(),
            left: 0,
            padding: 20,
            width: "100%",
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderColor: theme.color.informationBackground,
          }}
          intensity={200}
          tint="dark"
        >
          <Button
            title="Redeem"
            block
            variant="primary"
            onPress={() => {
              navigation.navigate("WalletPremium");
            }}
          />
        </BlurView>
      )}
    </>
  );
}

// No History Found
function NoHistoryFound({ ZentBanner }) {
  const generateEmptyList = (height, n) => {
    let initTop = 255;
    let paddintTop = 0;

    let result = [];
    for (let i = 1; i <= n; i++) {
      result.push(
        <WalletHistoryListEmpty key={i} style={{ top: initTop + paddintTop, height: height }} />
      );
      paddintTop += height + 15;
    }

    return result;
  };

  return (
    <Container style={{ flex: 1 }}>
      {ZentBanner}
      {generateEmptyList(88, 10)}
      <WalletInfoWrapper>
        <WalletInfoBody>
          <MaterialCommunityIcons
            name="clock-time-nine"
            size={40}
            color="white"
            style={{ marginBottom: 6 }}
          />
          <Text fontSize="h2" fontWeight="bold">
            History
          </Text>
          <Text fontSize="md" style={{ marginTop: 5 }}>
            Your activity and earning history will appear here.
          </Text>
        </WalletInfoBody>
      </WalletInfoWrapper>
      <NavigationPadding />
    </Container>
  );
}

// Wallet Component (Default)
export default function Wallet({ route, navigation }) {
  const { walletAmount, zenTransactions, fetchTransactions } = useAuth();
  const ZentToken = (
    <ZentTokenBanner
      tokens={Number(walletAmount).toFixed(6)}
      usd={0}
      onPress={() => {
        // navigation.navigate("ZentDonation");
      }}
    />
  );

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
    }, [])
  );

  return (
    <Canvas>
      {zenTransactions.filter((transaction) => transaction.type == "SONG_MINING").length > 0 ? (
        <History ZentBanner={ZentToken} />
      ) : (
        <NoHistoryFound ZentBanner={ZentToken} />
      )}
    </Canvas>
  );
}
