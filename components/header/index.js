import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { Text } from "components";
import { useTheme } from "stores/theme";
import React from "react";
import styled from "styled-components/native";

const HeaderWrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const HeaderTitle = styled.View`
  width: 107%;
  height: 100%;
  position: absolute;
  top: 5px;
  left: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export default function Header({ title = "", previousScreenName = "", addon = null, route }) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>
          <Text fontSize={16}>{title}</Text>
        </HeaderTitle>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="ios-chevron-back" size={26} color={theme.color.primary} />
          <Text color="primary" fontSize={16} fontWeight={600}>
            {previousScreenName}
          </Text>
        </TouchableOpacity>

        {addon}
      </HeaderWrapper>
    </>
  );
}
