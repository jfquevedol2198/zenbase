// Import Dependencies
import React, { useState } from "react";
import Text from "components/text";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "stores/theme";

// Styled Components
const AlertWrapper = styled.View`
  width: 100%;
  padding: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.color.hud};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

const AlertHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const AlertBody = styled.View`
  margin-top: ${(props) => props.theme.spacing.md};
`;

export default function Alert({ title, body, onClose, style }) {
  const { theme } = useTheme();
  const [isAlert, setIsAlert] = useState(true);

  return (
    isAlert && (
      <AlertWrapper style={style}>
        <AlertHeader>
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
          <TouchableOpacity
            onPress={() => {
              onClose?.();
              setIsAlert(!isAlert);
            }}
          >
            <Ionicons
              name="close"
              size={24}
              color={theme.color.secondary}
              style={{ marginTop: -5 }}
            />
          </TouchableOpacity>
        </AlertHeader>
        <AlertBody>
          <Text color="secondary">{body}</Text>
        </AlertBody>
      </AlertWrapper>
    )
  );
}
