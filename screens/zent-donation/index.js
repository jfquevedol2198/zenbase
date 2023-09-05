import React, { useState } from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import { Alert } from "react-native";

import styled from "styled-components/native";
import {
  View,
  Platform,
  SafeAreaView,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Switch,
} from "react-native";
import { useTheme } from "stores/theme";
import { BlurView } from "expo-blur";

// Import images
import ZenbaseWhiteVector from "assets/vectors/zenbase-white.png";
import ApplePayImage from "assets/images/apple-pay.png";
import { useAuth } from "stores/auth";
import axios from "services/axios";
// import { useApplePay } from "@stripe/stripe-react-native";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row-reverse;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? `10px` : `40px`)};
  z-index: 1;
`;

const DonationHeader = styled.View`
  width: 100%;
  flex: 2.5;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

const DonationFooter = styled.View`
  width: 100%;
  flex: 2;
`;

/**
 * ****
 * Card
 * ****
 */
const CardWrapper = styled.View`
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
`;

const ZenbaseLogo = styled.Image`
  width: 30px;
  height: 30px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

const DontationBoxWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DonationBox = styled.TouchableOpacity`
  height: 40px;
  border-radius: ${(props) => props.theme.borderRadius.md};
  border-width: 1px;
  border-color: ${(props) => props.theme.color.informationBackground};
  background-color: ${(props) => props.theme.color.hud};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const BlurViewWrapper = styled.SafeAreaView`
  flex: 1;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
  padding-bottom: ${(props) => props.theme.spacing.xxl};
`;

const Input = styled.TextInput`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.color.white};
  height: 45px;
  font-size: ${(props) => props.theme.fontSize.h1};
  font-weight: bold;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

const SwitchWrapper = styled.View`
  height: 47px;
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background-color: ${(props) => props.theme.color.hud};
  margin-bottom: ${(props) => props.theme.spacing.lg};
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ApplePayBanner = styled.Image`
  width: 100%;
  height: 225px;
  margin-bottom: 30px;
`;

// Zent Donation Component (Default)
export default function ZentDonation({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();
  const { walletAmount, secondsWorth } = useAuth();

  // Required Variables
  const totalZent = Number(walletAmount).toFixed(6);
  const usdValue = 0;

  // States
  const [isDonation, setIsDonation] = useState(false);
  const [donationValue, setDonationValue] = useState(0);
  const [selectedDonationBox, setSelectedDonationBox] = useState(-1);
  const [customDonation, setCustomDonation] = useState(false);
  const [customDonationValue, setCustomDonationValue] = useState("");
  const [USDDonation, setUSDDonation] = useState(true);
  // const { isApplePaySupported, presentApplePay, confirmApplePayPayment } =
  //   useApplePay();

  // Functions
  const selectDonationBox = (selectedDonationBox, donationValue) => {
    setDonationValue(donationValue);
    setSelectedDonationBox(selectedDonationBox);
  };

  const toggleUSDDonation = () => {
    setUSDDonation(!USDDonation);
  };

  // const raiseApplePayRequest = async (amt) => {
  //   try {
  //     // console.log(amt / 100);
  //     const { error, paymentMethod } = await presentApplePay({
  //       cartItems: [
  //         { label: "Zenbase Donation", amount: (amt / 100).toString() },
  //       ],
  //       country: "US",
  //       currency: "USD",
  //       requiredBillingContactFields: ["phoneNumber", "name", "emailAddress"],
  //     });

  //     if (error) {
  //       console.log({ applePayPresentError: error });
  //       Alert.alert(error.message);
  //       return;
  //     }

  //     // Fetch Client Secret from Server

  //     const response = await axios.post(`/stripe/${amt}`);

  //     const clientSecret = response.data.data.clientSecret;

  //     const { error: confirmError } = await confirmApplePayPayment(
  //       clientSecret
  //     );

  //     if (confirmError) {
  //       console.log({ applePayConfirmError: confirmError });
  //       Alert.alert(confirmError.message);
  //       return;
  //     }

  //     // Payment Success
  //     await axios.post("/payments", {
  //       amount: amt,
  //       reason: "DONATION",
  //       valid: true,
  //     });
  //     navigation.navigate("DonationThanks");
  //   } catch (e) {
  //     console.log({ applePayError: e });
  //     Alert.alert("Payment was not successful");
  //   }
  // };

  const donateZent = async () => {
    // Donate Zen Tokens
    let donationAmt = 0.5;
    if (donationValue != "") {
      donationAmt = donationValue;
    } else if (selectedDonationBox == 0) {
      donationAmt = 0.5;
    } else if (selectedDonationBox == 1) {
      donationAmt = 5;
    } else if (selectedDonationBox == 2 && !USDDonation) {
      donationAmt = walletAmount;
    } else if (selectedDonationBox == 2 && USDDonation) {
      donationAmt = 10;
    }

    if (USDDonation) {
      // await raiseApplePayRequest(Number(donationAmt) * 100);
      alert("Donations are disabled.");
    } else {
      if (donationAmt > walletAmount) {
        alert(`You dont have enough ZENT!`);
        return;
      }
      await axios.post("/transactions", {
        amount: -donationAmt,
        appreciatedFor: secondsWorth,
        type: "DONATE",
        remarks: "",
        meta: {},
      });
      navigation.navigate("DonationThanks");
    }
  };

  return (
    <>
      <Canvas>
        <Header>
          {isDonation && (
            <Button variant="silent" title="Cancel" onPress={() => navigation.goBack()} />
          )}
        </Header>
        <Container style={{ flex: 1 }}>
          <DonationHeader>
            <CardWrapper>
              <CardBody>
                <ZenbaseLogo source={ZenbaseWhiteVector} />
                {isDonation ? (
                  <>
                    <Text
                      fontSize="h2"
                      fontWeight="bold"
                      style={{ textAlign: "center", marginBottom: 10 }}
                    >
                      Level up your wellness regimen
                    </Text>
                    <View style={{ width: "80%" }}>
                      <Text fontSize="md" style={{ textAlign: "center" }}>
                        Rewards for your mindfulness practice. All thanks to donations by people
                        like you.
                      </Text>
                    </View>
                  </>
                ) : (
                  <Text fontSize="h2" fontWeight="bold" style={{ textAlign: "center" }}>
                    Help us reward you for your wellness!
                  </Text>
                )}
              </CardBody>
            </CardWrapper>

            <ApplePayBanner source={ApplePayImage} resizeMode={"contain"} />
            {/* <ZentTokenBanner tokens={totalZent} usd={usdValue} /> */}
          </DonationHeader>
          <DonationFooter>
            {isDonation ? (
              <CardWrapper>
                <CardBody style={{ justifyContent: "flex-start" }}>
                  <Text
                    fontSize="md"
                    style={{
                      marginTop: 10,
                      marginBottom: 15,
                      textAlign: "center",
                    }}
                  >
                    Most Popular
                  </Text>

                  <DontationBoxWrapper>
                    <View
                      style={{
                        width: "33.34%",
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <DonationBox
                        style={
                          selectedDonationBox == 0 && {
                            borderColor: theme.color.primary,
                            backgroundColor: "white",
                          }
                        }
                        onPress={() => {
                          selectDonationBox(0, 0.5);
                        }}
                      >
                        <Text
                          color={selectedDonationBox == 0 && "primary"}
                          fontWeight={selectedDonationBox == 0 && "bold"}
                        >
                          0.5 {USDDonation ? "USD" : "ZENT"}
                        </Text>
                      </DonationBox>
                    </View>

                    <View
                      style={{
                        width: "33.34%",
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <DonationBox
                        style={
                          selectedDonationBox == 1 && {
                            borderColor: theme.color.primary,
                            backgroundColor: "white",
                          }
                        }
                        onPress={() => {
                          selectDonationBox(1, 5);
                        }}
                      >
                        <Text
                          color={selectedDonationBox == 1 && "primary"}
                          fontWeight={selectedDonationBox == 1 && "bold"}
                        >
                          5 {USDDonation ? "USD" : "ZENT"}
                        </Text>
                      </DonationBox>
                    </View>

                    <View
                      style={{
                        width: "33.34%",
                        paddingLeft: 5,
                        paddingRight: 5,
                      }}
                    >
                      <DonationBox
                        style={
                          selectedDonationBox == 2 && {
                            borderColor: theme.color.primary,
                            backgroundColor: "white",
                          }
                        }
                        onPress={() => {
                          if (USDDonation) {
                            selectDonationBox(2, 10);
                          } else {
                            selectDonationBox(2, totalZent);
                          }
                        }}
                      >
                        <Text
                          color={selectedDonationBox == 2 && "primary"}
                          fontWeight={selectedDonationBox == 2 && "bold"}
                        >
                          {USDDonation ? "10 USD" : "All"}
                        </Text>
                      </DonationBox>
                    </View>
                  </DontationBoxWrapper>

                  <DontationBoxWrapper style={{ marginTop: 15 }}>
                    <View style={{ width: "100%", paddingLeft: 5, paddingRight: 5 }}>
                      <DonationBox
                        style={
                          selectedDonationBox == 3
                            ? {
                                borderColor: theme.color.primary,
                                backgroundColor: "white",
                                justifyContent: "flex-start",
                                paddingLeft: 10,
                              }
                            : { justifyContent: "flex-start", paddingLeft: 10 }
                        }
                        onPress={() => {
                          setCustomDonation(true);
                        }}
                      >
                        <Text
                          color={selectedDonationBox == 3 ? "primary" : "information"}
                          fontWeight={selectedDonationBox == 3 && "bold"}
                        >
                          {selectedDonationBox == 3
                            ? `${donationValue} ${USDDonation ? "USD" : "ZENT"}`
                            : `Enter custom amount...`}
                        </Text>
                      </DonationBox>
                    </View>
                  </DontationBoxWrapper>
                </CardBody>
                <CardFooter>
                  {/* <SwitchWrapper>
                    <Text numberOfLines={1}>Make donation in USD</Text>
                    <Switch
                      onValueChange={toggleUSDDonation}
                      value={USDDonation}
                    />
                  </SwitchWrapper> */}
                  <Button
                    title="Donate"
                    variant={donationValue > 0 ? "primary" : "disabled"}
                    block
                    onPress={() => donationValue > 0 && donateZent()}
                  />
                </CardFooter>
              </CardWrapper>
            ) : (
              <CardWrapper>
                <CardBody>
                  <Text fontSize="md" style={{ textAlign: "center" }}>
                    Zenbase’s commitment to promoting mindfulness is possible thanks to donations
                    from people like you.
                  </Text>
                  <Text fontSize="15" style={{ marginTop: 20, textAlign: "center" }}>
                    Can we count on you?
                  </Text>
                </CardBody>
                <CardFooter>
                  <Button
                    title="Yes"
                    block
                    onPress={() => {
                      setIsDonation(true);
                    }}
                  />
                  <Box h="10px" />
                  <Button
                    title="No"
                    variant="secondary"
                    block
                    onPress={() => {
                      navigation.goBack();
                    }}
                  />
                </CardFooter>
              </CardWrapper>
            )}
          </DonationFooter>
        </Container>
      </Canvas>
      {customDonation && (
        <BlurView
          intensity={200}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 2,
            width: "100%",
            height: "100%",
            paddingLeft: 20,
            paddingRight: 20,
          }}
          tint="dark"
        >
          <KeyboardAvoidingView
            style={{ width: "100%", height: "100%" }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <BlurViewWrapper>
              <Input
                autoFocus={true}
                keyboardType="numeric"
                onChangeText={(value) => setCustomDonationValue(value)}
                value={customDonationValue}
              />
              <Text style={{ marginBottom: 20 }}>{USDDonation ? "USD" : "ZENT"}</Text>
              <Button
                block
                title="Done"
                onPress={() => {
                  selectDonationBox(3, +customDonationValue);
                  setCustomDonationValue("");
                  setCustomDonation(false);
                }}
              />
            </BlurViewWrapper>
          </KeyboardAvoidingView>
        </BlurView>
      )}
    </>
  );
}
