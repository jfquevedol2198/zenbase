// Import Dependencies
import React from "react";
import { View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import Text from "components/text";

const ListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

const ListContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 16px;
`;

const VAlignCenter = styled.View`
  padding-top: 12px;
  padding-bottom: 12px;
  flex-direction: column;
  justify-content: center;
`;

export default function IOSList({ data = [], transparent, notDefault, withoutChevron, style }) {
  const { theme } = useTheme();

  return (
    <View
      style={
        !transparent
          ? { ...style, backgroundColor: theme.color.hud }
          : notDefault
          ? style
          : {
              ...style,
              borderTopWidth: 1,
              borderTopColor: theme.color.informationBackground,
              borderBottomWidth: 1,
              borderBottomColor: theme.color.informationBackground,
            }
      }
    >
      {data.map((obj, index) => {
        /**
         * obj: {
         *   icon,   # Componet
         *   title,  # Text
         *   onPress # Function
         * }
         */
        return (
          <TouchableOpacity key={index} onPress={obj.onPress || null} style={{ width: "100%" }}>
            <ListWrapper>
              <VAlignCenter style={{ marginLeft: 5 }}>{obj.icon}</VAlignCenter>
              <ListContentWrapper
                style={
                  !(transparent && notDefault) &&
                  data.length - 1 == index && { borderBottomWidth: 0 }
                }
              >
                <VAlignCenter>
                  <Text color={obj.color || "white"} fontSize="18">
                    {obj.title}
                  </Text>
                </VAlignCenter>
                <VAlignCenter style={{ paddingLeft: 2 }}>
                  {withoutChevron || (
                    <Entypo
                      name="chevron-right"
                      size={20}
                      color={obj.chevronColor || theme.color.description}
                      style={{ marginTop: 2 }}
                    />
                  )}
                </VAlignCenter>
              </ListContentWrapper>
            </ListWrapper>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
