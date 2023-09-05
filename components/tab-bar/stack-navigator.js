// Import Dependencies
import React from "react";
import { TouchableOpacity, SafeAreaView, View, Platform } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const TabBarWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xxl};
`;

export default function StackNavigatorTabBar({
  labels = ["Home", "Search", "Wallet", "Favorites", "Profile"],
  style = {},
}) {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <BlurView
      intensity={200}
      tint="dark"
      style={[
        {
          position: "absolute",
          width: "100%",
          bottom: 0,
          left: 0,
          height: useSafeAreaInsets().bottom + 50,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      <TabBarWrapper>
        {labels.map((label, index) => {
          return (
            (label == "Home" ||
              label == "Search" ||
              label == "Wallet" ||
              label == "Favorites" ||
              label == "Profile") && (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                onPress={() => {
                  navigation.goBack();
                  navigation.navigate(label);
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {(() => {
                  switch (label) {
                    case "Home":
                      return <Ionicons name="play-circle" size={28} color={"#939595"} />;
                    case "Search":
                      return <Ionicons name="ios-search" size={28} color={"#939595"} />;
                    case "Wallet":
                      return <Ionicons name="md-wallet" size={28} color={"#939595"} />;
                    case "Favorites":
                      return <Ionicons name="heart" size={28} color={"#939595"} />;
                    case "Profile":
                      return <Ionicons name="person-circle-outline" size={28} color={"#939595"} />;
                  }
                })()}
              </TouchableOpacity>
            )
          );
        })}
      </TabBarWrapper>
    </BlurView>
  );
}
