import React from "react";
import { Text, Button } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions } from "@react-navigation/native";

// Import images
import ZentBackground from "assets/images/wallet/zent-bg-lg.png";
import ZenbaseFullLogo from "assets/images/zenbase-full-white-logo.png";

// Styled Component
const BackgroundWrapper = styled.ImageBackground`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.color.background};
`;

const ZenbaseLogo = styled.Image`
  width: 261px;
  height: 71px;
`;

/**
 * ****
 * Card
 * ****
 */
const CardWrapper = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CardBody = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardFooter = styled.View`
  width: 100%;
  flex-direction: column;
  padding-bottom: ${(props) => props.theme.spacing.lg};
  padding-left: ${(props) => props.theme.spacing.xxl};
  padding-right: ${(props) => props.theme.spacing.xxl};
`;

// Donation Thanks (Default)
export default function DonationThanks({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();

  return (
    <BackgroundWrapper source={ZentBackground}>
      <CardWrapper>
        <CardBody>
          <ZenbaseLogo source={ZenbaseFullLogo} resizeMode="contain" />
          <Ionicons name="heart" size={48} color="white" style={{ marginTop: 60 }} />
          <Text
            fontSize="xl"
            fontWeight="500"
            style={{ marginTop: 20, textAlign: "center" }}
            color="header90"
          >
            Thank you for your donation!
          </Text>
        </CardBody>
        <CardFooter>
          <Button
            title="Done"
            variant="white"
            block
            onPress={() => {
              // Reset Stack Navigation
              navigation.dispatch(
                CommonActions.reset({
                  routes: [
                    {
                      name: "App",
                      state: {
                        routes: [{ name: "Wallet" }],
                      },
                    },
                  ],
                })
              );
            }}
          />
        </CardFooter>
      </CardWrapper>
    </BackgroundWrapper>
  );
}
