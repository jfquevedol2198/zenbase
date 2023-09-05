import React from "react";
import { Container, Canvas, Text, Button, ZentTokenBanner, Box } from "components";
import { ReactNativeShare } from "helpers";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import axios from "services/axios";
import AsyncStorageLib from "@react-native-async-storage/async-storage";

// Import Icons
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "stores/auth";
import { CommonActions } from "@react-navigation/native";

// Import Images
import deleteIcon from "assets/icons/delete.png";
import zentLogo from "assets/logos/zent-with-alert.png";
import { useTheme } from "stores/theme";

// Styled Component
const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 5px;
`;

const HeaderImageWrapper = styled.View`
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const HeaderImage = styled.Image`
  width: 54px;
  height: 30px;
  margin-bottom: 7px;
`;

const InfoWrapper = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Rewards = styled.Image`
  width: 120px;
  height: 30px;
  margin-bottom: 13px;
`;

const Icon = styled.Image`
  width: 32px;
  height: 32px;
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

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const DeleteButton = styled.TouchableOpacity`
  height: 55px;
  width: 100%;
  border: 1px solid ${(props) => props.theme.color.description};
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.hud};
  justify-content: center;
  align-items: center;
`;

// ReferFriend (Default)
export default function DeleteAccount({ route, navigation }) {
  const { walletAmount, user } = useAuth();
  const { theme } = useTheme();

  const goBack = () => {
    navigation.goBack();
  };

  const deleteAccount = async () => {
    try {
      const { data } = await axios.delete(`/admin/users/${user._id}`);
      if (data.data === "success") {
        await AsyncStorageLib.removeItem("recents");
        await AsyncStorageLib.removeItem("@zenbase_user");
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }],
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Canvas>
      <HeaderWrapper>
        <TouchableOpacity onPress={goBack} style={{ flexDirection: "row", marginLeft: 10 }}>
          <Ionicons name="ios-chevron-back" size={26} color={theme.color.primary} />
          <Text fontWeight="600" fontSize="16" color="primary" style={{ marginTop: 4 }}>
            Settings
          </Text>
        </TouchableOpacity>
        <HeaderImageWrapper>
          <HeaderImage source={zentLogo} resizeMode="contain" />
          <Text fontSize="14">{Number(walletAmount).toFixed(6)} ZENT</Text>
        </HeaderImageWrapper>
        <HeaderImageWrapper>
          <Box w="100px" />
        </HeaderImageWrapper>
      </HeaderWrapper>
      <Container style={{ flex: 1 }}>
        <InfoWrapper>
          <InfoBody>
            <Icon source={deleteIcon} resizeMode="contain" />
            <Text color="#939595" fontSize="24" style={{ margin: 10 }} fontWeight="600">
              Delete My Account
            </Text>
            <Text
              color="#939595"
              fontSize="14"
              style={{ paddingLeft: "8%", paddingRight: "8%", textAlign: "center" }}
            >
              There is no recovery method to get back earned Zentoken once your account is deleted.
              Your Zentoken will be recirculated to Zenbase for others to earn.
            </Text>
          </InfoBody>
          <InfoFooter>
            <Row style={{ marginBottom: 15 }}>
              <Text fontSize="14">For billing questions email </Text>
              <Text fontSize="14" color="primary">
                meditate@zenbase.us
              </Text>
            </Row>
            <DeleteButton onPress={deleteAccount}>
              <Text numberOfLines={1} adjustsFontSizeToFit fontSize="14" fontWeight="600">
                Delete my account and Zentoken
              </Text>
            </DeleteButton>
          </InfoFooter>
        </InfoWrapper>
      </Container>
    </Canvas>
  );
}
