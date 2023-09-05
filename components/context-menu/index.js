import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import Text from "components/text";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";

const ContextMenuWrapper = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
`;

const ContextMenuView = styled.View`
  position: absolute;
  width: 200px;
  overflow: hidden;
  flex: 1;
  border-radius: ${(props) => props.theme.borderRadius.xl};
`;

const ContextMenuList = styled.TouchableOpacity`
  width: 100%;
  height: 45px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 0.5px;
  border-bottom-color: #acb29b50;
  padding-horizontal: ${(props) => props.theme.spacing.lg};
`;

const ContextMenuDivider = styled.View`
  height: 5px;
  width: 100%;
  background-color: #1213145c;
`;

export default function ContextMenu({
  display,
  closeHandler,
  top = 0,
  left = 0,
  menuList = [],
  onLayout,
}) {
  return (
    <TouchableWithoutFeedback onPress={closeHandler}>
      <ContextMenuWrapper
        style={[display ? { opacity: 1, zIndex: 1 } : { opacity: 0, zIndex: -1 }]}
      >
        <ContextMenuView
          style={[{ top, left }]}
          onLayout={(event) => {
            if (onLayout) {
              onLayout(event.nativeEvent.layout);
            }
          }}
        >
          <BlurView intensity={200} tint="dark">
            {menuList.map((item, index) => {
              return item.divider ? (
                index != menuList.length - 1 && <ContextMenuDivider />
              ) : (
                <ContextMenuList
                  onPress={item.onPress}
                  style={[
                    (index == menuList.length - 1 || menuList[index + 1]?.divider) && {
                      borderBottomWidth: 0,
                    },
                  ]}
                >
                  <Text fontSize="md" color={item.color || "white"}>
                    {item.title}
                  </Text>
                  {item.icon}
                </ContextMenuList>
              );
            })}
          </BlurView>
        </ContextMenuView>
      </ContextMenuWrapper>
    </TouchableWithoutFeedback>
  );
}
