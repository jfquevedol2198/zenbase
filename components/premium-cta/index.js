import React from "react";
import Text from "components/text";
import styled from "styled-components/native";

// Import Images
import CTABackground from "assets/images/cta/bg.png";
import PremiumCTAImage from "assets/images/cta/premium.png";
import PremiumCTAFooterImage from "assets/images/cta/premium-footer-bg.png";
// import { useApplePay } from "@stripe/stripe-react-native";
import { Alert } from "react-native";
import axios from "services/axios";
import { useAuth } from "stores/auth";

// Styled Component
const CTAWrapper = styled.ImageBackground`
  flex: 1;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  justify-content: flex-start;
  flex-direction: column;
`;

const PaddingWrapper = styled.View`
  flex: 1;
  padding: ${(props) => props.theme.spacing.md};
`;

const CTAImageWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const CTAImage = styled.Image`
  width: 92%;
  height: 100%;
  border-color: #ffffff;
`;

const FooterWrapper = styled.ImageBackground`
  height: 61px;
  width: 100%;
  overflow: hidden;
  border-bottom-left-radius: ${(props) => props.theme.borderRadius.lg};
  border-bottom-right-radius: ${(props) => props.theme.borderRadius.lg};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
`;

const GetButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  background-color: ${(props) => props.theme.color.white};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

export default function PremiumCTA({ navigation, onPress }) {
  // const { isApplePaySupported, presentApplePay, confirmApplePayPayment } =
  //   useApplePay();

  const { user, updateUser } = useAuth();

  const onPressGet = async () => {
    try {
      // const { error, paymentMethod } = await presentApplePay({
      //   cartItems: [{ label: "Zenbase Premium", amount: "4.99" }],
      //   country: "US",
      //   currency: "USD",
      //   requiredBillingContactFields: ["phoneNumber", "name", "emailAddress"],
      // });

      // if (error) {
      //   console.log({ applePayError: error });
      //   Alert.alert(error.message);
      //   return;
      // }

      // Fetch Client Secret from Server

      // const response = await axios.post("/stripe");

      // const clientSecret = response.data.data.clientSecret;

      // const { error: confirmError } = await confirmApplePayPayment(
      //   clientSecret
      // );

      // if (confirmError) {
      //   console.log({ applePayConfirmError: confirmError });
      //   Alert.alert(confirmError.message);
      //   return;
      // }

      // Payment Success
      await axios.post("/payments", {
        amount: 0,
        reason: "PREMIUM",
        valid: true,
        premium: true,
      });
    } catch (e) {
      console.log({ applePayError: e });
      Alert.alert("Payment was not successful");
    }
  };

  return (
    <CTAWrapper source={CTABackground}>
      <PaddingWrapper>
        <Text fontSize="md" style={{ marginBottom: 6 }}>
          USER
        </Text>
        <Text fontSize="20" fontWeight="600">
          “Zenbase Premium has changed my life and my portfolio.”
        </Text>
        <CTAImageWrapper>
          <CTAImage source={PremiumCTAImage} resizeMode="contain" />
        </CTAImageWrapper>
      </PaddingWrapper>
      <FooterWrapper source={PremiumCTAFooterImage}>
        {user?.isPremium && <Text>You are already a Zenbase Premium Member</Text>}
        {/* Removed 'isApplePaySupported &&'  from below statement */}
        {!user?.isPremium ? (
          <>
            <Text>$0.00 per month</Text>
            <GetButton onPress={onPressGet}>
              <Text color="primary" fontSize="md" fontWeight="bold">
                CLAIM
              </Text>
            </GetButton>
          </>
        ) : (
          !user?.isPremium && <Text>Apple Pay is not supported on your device</Text>
        )}
      </FooterWrapper>
    </CTAWrapper>
  );
}
