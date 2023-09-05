import React, { useState } from "react";
import { Alert, Container, Canvas, Text } from "components";
import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { useTheme } from "stores/theme";

// Import Icons
import { Entypo } from "@expo/vector-icons";

// Styled Component
const CancelButton = styled.View`
  width: 100%;
  height: 62.44px;
  border-radius: 13.52px;
  background-color: #1c1c1e;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DeleteWrapper = styled.View`
  width: 100%;
  border-radius: 13.52px;
  background-color: #1c1c1e;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 8.32px;
`;

const DeleteMessage = styled.View`
  width: 100%;
  height: 62.96px;
  border-radius: 13.52px;
  background-color: #1c1c1e;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 16.64px;
  padding-right: 16.64px;
`;

const DeleteButton = styled.View`
  width: 100%;
  height: 62.96px;
  border-bottom-left-radius: 13.52px;
  border-bottom-right-radius: 13.52px;
  background-color: #1c1c1e;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${(props) => props.theme.color.hud};
`;

// Delete Journal Component (Default)
export default function DeleteJournal({ onClose = null, onDelete = null }) {
  return (
    <Canvas style={{ backgroundColor: "rgba(0,0,0,0.4)" }}>
      <Container
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <DeleteWrapper>
          <DeleteMessage>
            <Text
              style={{ textAlign: "center" }}
              color="rgba(235, 235, 245, 0.6)"
              fontSize="14.56"
              fontWeight="600"
            >
              Are you sure you want to delete this journal entry from your Library?
            </Text>
          </DeleteMessage>
          <TouchableWithoutFeedback onPress={onDelete}>
            <DeleteButton>
              <Text fontSize="20" color="red" fontWeight="400">
                Delete Journal Entry
              </Text>
            </DeleteButton>
          </TouchableWithoutFeedback>
        </DeleteWrapper>
        <TouchableWithoutFeedback onPress={onClose}>
          <CancelButton>
            <Text fontSize="20" fontWeight="600">
              Cancel
            </Text>
          </CancelButton>
        </TouchableWithoutFeedback>
      </Container>
    </Canvas>
  );
}
