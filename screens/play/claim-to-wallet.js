import React, { useEffect, useState } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { TouchableOpacity, Dimensions, ScrollView } from "react-native";
import ConfettiCannon from "react-native-confetti-cannon";
import * as Haptics from "expo-haptics";
import { useAuth } from "stores/auth";

// Import Icons
import { Ionicons } from "@expo/vector-icons";

// Import Images
import ConfettiImage from "assets/images/confetti.png";
import wallpaper1 from "assets/images/wallpapers/wallpaper-1.png";
import axios from "services/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

// Styled Component
const BackgroundImage = styled.ImageBackground`
  width: 100%;
  height: 100%;
`;

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const InfoBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoFooter = styled.View`
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
  width: ${windowWidth * 0.89}px;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  padding: ${(props) => props.theme.spacing.md};
  padding-left: ${(props) => props.theme.spacing.xxl};
  padding-right: ${(props) => props.theme.spacing.xxl};
  background-color: ${(props) => props.theme.color.hud};
  border-radius: ${(props) => props.theme.borderRadius.lg};
  margin-right: ${(props) => props.theme.spacing.sm};
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

const calculateLength = (_duration) => {
  if (_duration) {
    _duration += 5 * 60;
    const minutes = Math.ceil(_duration / 60);
    return `${minutes} min`;
  }
  return "~ min";
};

// ClaimToWallet (Default)
export default function ClaimToWallet({ route, navigation }) {
  const { transactTokens, zentokens, song, position, duration } = route.params;
  const { secondsWorth } = useAuth();



  const [is100thMeditation, setIs100thMeditation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onPressClaimToWallet = async () => {
    if (!isLoading) {
      await transactTokens();
      await AsyncStorage.removeItem("lastClickedSong");
      setIsLoading(false);
    }
    navigation.navigate("Home");
  };

  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    fetch100thMeditation();
  }, []);

  const fetch100thMeditation = async () => {
    try {
      const response = await axios.get("/auth/meditation-100");
      setIs100thMeditation(response?.data?.data?.is100thMeditation || false);
    } catch (e) {
      axios.handleError(e);
    }
  };

  return (
    <Canvas>
      {/* <BackgroundImage source={ConfettiImage} resizeMode="cover"> */}
      <BackgroundImage>
        <ConfettiCannon
          count={100}
          fallSpeed={2000}
          origin={{ x: windowWidth / 2, y: windowHeight - 100 }}
          fadeOut
        />
        <Container>
          <ZentTokenBanner tokens={Number(zentokens).toFixed(6)} usd={0.0} />

          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{
              width: "100%",
              paddingTop: 5,
              paddingBottom: 5,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: "rgba(172, 178, 155, 0.5)",
            }}
            snapToInterval={Dimensions.get("window").width * 0.84 + 8}
            decelerationRate="fast"
            horizontal={true}
          >
            <WalletHistoryList>
              <WalletHistoryListText>
                <Text fontSize="lg" numberOfLines={1} color="primary">
                  {calculateLength(zentokens / secondsWorth)} • {Number(zentokens).toFixed(6)} ZENT
                </Text>
                <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                  {song?.name}
                </Text>
                <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }} color="secondary">
                  {song?.artist.map((artist) => artist.name).join(", ")}
                </Text>
              </WalletHistoryListText>
              <WalletHistoryListThumbnail
                source={{ uri: song?.artwork?.replace("https", "http") }}
                resizeMode="cover"
              />
            </WalletHistoryList>

            {/* <WalletHistoryList style={{ width: windowWidth * 0.865 }}>
              <WalletHistoryListText>
                <Text fontSize="lg" numberOfLines={1} color="primary">
                  5 minutes • 0.01 ZENT
                </Text>
                <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                  Our Purpose Has Presence
                </Text>
                <Text
                  fontSize="md"
                  numberOfLines={1}
                  style={{ marginTop: 2 }}
                  color="secondary"
                >
                  Damon
                </Text>
              </WalletHistoryListText>
              <WalletHistoryListThumbnail
                source={wallpaper1}
                resizeMode="cover"
              />
            </WalletHistoryList>

            <WalletHistoryList style={{ width: windowWidth * 0.865 }}>
              <WalletHistoryListText>
                <Text fontSize="lg" numberOfLines={1} color="primary">
                  5 minutes • 0.01 ZENT
                </Text>
                <Text fontSize="md" numberOfLines={1} style={{ marginTop: 2 }}>
                  Our Purpose Has Presence
                </Text>
                <Text
                  fontSize="md"
                  numberOfLines={1}
                  style={{ marginTop: 2 }}
                  color="secondary"
                >
                  Damon
                </Text>
              </WalletHistoryListText>
              <WalletHistoryListThumbnail
                source={wallpaper1}
                resizeMode="cover"
              />
            </WalletHistoryList> */}
          </ScrollView>
        </Container>
        <Container style={{ flex: 1 }}>
          {/* <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ width: '100%', height: 90 }}
            horizontal={true}>

          </ScrollView> */}
             
          <InfoWrapper>
            <InfoBody>
              <Ionicons name="gift" size={34} style={{ marginBottom: 12 }} color="white" />
              <Text fontSize="h2" fontWeight="bold">
                You’ve received {Number(zentokens).toPrecision(2)} ZENT
              </Text>
              {is100thMeditation && (
                <Text fontSize="h2" fontWeight="bold" color="primary">
                  That’s your 100th meditation!
                </Text>
              )}
              
            </InfoBody>
            <InfoFooter>
              <Button
                title={isLoading ? "Please Wait..." : "Claim to wallet"}
                block
                onPress={() => {
                  setIsLoading(true);
                  onPressClaimToWallet();
                }}
              />
            </InfoFooter>
          </InfoWrapper>
        </Container>
      </BackgroundImage>
    </Canvas>
  );
}
 