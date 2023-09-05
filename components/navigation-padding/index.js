import React from "react";
import Box from "components/box";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const NavigationPaddingInsets = () => 50;
export const NavigationPaddingInsetsWithSafeArea = () =>
  useSafeAreaInsets().bottom + NavigationPaddingInsets();

export default function NavigationPadding({ withSafeAreaInsets, padding = 0 }) {
  return (
    <Box
      h={
        (withSafeAreaInsets ? useSafeAreaInsets().bottom : 0) +
        NavigationPaddingInsets() +
        padding +
        "px"
      }
    />
  );
}
