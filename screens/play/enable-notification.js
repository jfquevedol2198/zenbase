import React from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import styled from "styled-components/native";
import { Dimensions, Image, ScrollView } from "react-native";

// Import Icons
import { FontAwesome } from "@expo/vector-icons";

// Import Images
import wallpaper1 from "assets/images/wallpapers/wallpaper-1.png";
import notificationIcon from "assets/vectors/zenbase-notifications.png";

const windowWidth = Dimensions.get("window").width;

// Styled Component
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
  width: ${windowWidth * 0.85};
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

// EnableNotification (Default)
export default function EnableNotification({ route, navigation }) {
  return (
    <Canvas>
      <Container>
        <ZentTokenBanner tokens={0.01} usd={0.0} />
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

          <WalletHistoryList style={{ width: windowWidth * 0.865 }}>
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

          <WalletHistoryList style={{ width: windowWidth * 0.865 }}>
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
        </ScrollView>
      </Container>
      <Container style={{ flex: 1 }}>
        <InfoWrapper>
          <InfoBody>
            <Image
              source={notificationIcon}
              style={{ marginBottom: 12, width: 40, height: 40 }}
              resizeMode="contain"
            />
            <Text fontSize="h2" fontWeight="bold">
              Turn on reminders to meditate
            </Text>
            <Text fontSize="md" style={{ marginTop: 5 }}>
              Set yourself up for success.
            </Text>
          </InfoBody>
          <InfoFooter>
            <Button title="Enable notifications" block onPress={() => {}} />
            <Box h="10px" />
            <Button title="Not now" variant="secondary" block onPress={() => {}} />
          </InfoFooter>
        </InfoWrapper>
      </Container>
    </Canvas>
  );
}
