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
import zenCoinLogo from "assets/logos/zent-coin.png";
import historyIcon from "assets/icons/history.png";

// import wallpaper1 from "assets/images/wallpapers/wallpaper-1.png";
// import wallpaper2 from "assets/images/wallpapers/wallpaper-2.png";
// import wallpaper3 from "assets/images/wallpapers/wallpaper-3.png";
// import wallpaper4 from "assets/images/wallpapers/wallpaper-4.png";
import { useTheme } from "stores/theme";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "stores/auth";
import { useCallback } from "react";
import WalletGridCard from "./walletGridCard";

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

const HistoryIcon = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(33.82)}px;
  height: ${({ theme: { getSize } }) => getSize(32)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(15)}px;
`;

const HistoryText = styled(Text)`
  color: #939595;
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-hight: ${({ theme: { getSize } }) => getSize(29)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(4)}px;
`;
const HistoryDecText = styled(Text)`
  color: #939595;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-hight: ${({ theme: { getSize } }) => getSize(24)}px;
`;
const WalletInfoFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
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
  width: 27.42px;
  margin-bottom: 7px;
  border-radius: 2px;
  object-fit: contain;
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

  console.log(JSON.stringify({ zenTransactions }, null, 2));

  const filteredZenTransactions = zenTransactions
    .filter((transaction) => transaction.type == "SONG_MINING")
    .slice(0)
    .reverse();

  const fullDate = (date) => {
    const mainDate = new Date(date);
   

    const month = mainDate.getMonth() + 1;
    return (
      <>
        {mainDate.getDate()}/{month < 10 ? "0" + month : month}/{mainDate.getFullYear()}
      </>
    );
  };

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
          <WalletGridCard />
          <Title>Your Activity</Title>

          {/* Wallet History List */}
          {filteredZenTransactions.map((transaction) => (
            <WalletHistoryList>
              <WalletHistoryListText>
                <Text fontSize="lg" numberOfLines={1}>
                  <WalletHistoryZentCoin color="primary">
                    {Number(transaction.amount).toFixed(6)} ZENT
                  </WalletHistoryZentCoin>{" "}
                  <WalletHistoryDateTime>
                    {transactionListenDuration(transaction)} • {fullDate(transaction?.updatedAt)}
                  </WalletHistoryDateTime>
                </Text>
                <WalletHistoryListSongName numberOfLines={1}>
                  {transaction.meta?.song}
                </WalletHistoryListSongName>
              </WalletHistoryListText>
              <WalletHistoryListThumbnail
                source={{ uri: transaction.meta?.artwork }}
                resizeMode="cover"
              />
            </WalletHistoryList>
          ))}

          {/* Wallet History List - End*/}

          <NavigationPadding padding={40} />
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
            <HeaderImage source={zenCoinLogo} resizeMode="cover" />
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
  return (
    <Container style={{ flex: 1 }}>
      {ZentBanner}
      <WalletGridCard />
      <WalletInfoWrapper>
        <WalletInfoBody>
          <HistoryIcon source={historyIcon} />
          <HistoryText fontWeight="bold">History</HistoryText>
          <HistoryDecText>Your earning activity will appear here.</HistoryDecText>
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

  const isSongMissing =
    zenTransactions.filter((transaction) => transaction.type == "SONG_MINING").length > 0;

  // console.log("qwere", { isSongMissing, zenTransactions });
  return (
    <Canvas>
      {isSongMissing ? (
        <History ZentBanner={ZentToken} />
      ) : (
        <NoHistoryFound ZentBanner={ZentToken} />
      )}
    </Canvas>
  );
}

const Title = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(24)}px;
  line-height: ${({ theme: { getSize } }) => getSize(29)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(14)}px;
  font-weight: 600;
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
  align-items: center;
  margin-bottom: ${({ theme: { getSize } }) => getSize(15)}px;
  height: ${({ theme: { getSize } }) => getSize(88)}px;
  padding-left: ${({ theme: { getSize } }) => getSize(25)}px;
  padding-right: ${({ theme: { getSize } }) => getSize(20)}px;
  background-color: ${(props) => props.theme.color.hud};
  border-radius: ${({ theme: { getSize } }) => getSize(10)}px;
`;
const WalletHistoryZentCointimeDate = styled(Text)`
  font-size: ${({ theme: { getSize } }) => getSize(14)}px;
  line-height: ${({ theme: { getSize } }) => getSize(17)}px;
`;
const WalletHistoryZentCoin = styled(WalletHistoryZentCointimeDate)`
  font-weight: 700;
`;
const WalletHistoryDateTime = styled(WalletHistoryZentCointimeDate)``;
const WalletHistoryListText = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
`;

const WalletHistoryListThumbnail = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(70)}px;
  height: ${({ theme: { getSize } }) => getSize(68)}px;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  object-fit: cover;
`;

const WalletHistoryListSongName = styled(Text)`
  font-weight: 600;
  padding-right: ${({ theme: { getSize } }) => getSize(10)}px;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(30)}px;
`;
