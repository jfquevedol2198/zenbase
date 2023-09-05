import React from "react";
import { StatusBar, SafeAreaView } from "react-native";
import styled from "styled-components/native";

const BackdropView = styled.View`
  background: ${(props) => props.theme.color.background};
`;

const expandBoundsStyle = {
  flex: 1,
};

export default function Canvas({ children, style = {} }) {
  return (
    <BackdropView style={[expandBoundsStyle, style]}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={[expandBoundsStyle, style]}>{children}</SafeAreaView>
    </BackdropView>
  );
}
