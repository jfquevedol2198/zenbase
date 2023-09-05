// Import Dependencies
import React from "react";
import { TouchableOpacity, SafeAreaView, View, Platform } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabBarWrapper = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: ${Platform.OS == "ios" ? 20 : 0}px;
`;

export default function TabBar({ state, descriptors, navigation }) {
  const { theme } = useTheme();

  return (
    <BlurView
      intensity={200}
      tint="dark"
      style={{
        position: "absolute",
        width: "100%",
        bottom: 0,
        left: 0,
        height: useSafeAreaInsets().bottom + 50 + (Platform.OS == "android" ? 10 : 0),
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TabBarWrapper>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            (label == "Home" ||
              label == "Search" ||
              label == "Wallet" ||
              label == "Favorites" ||
              label == "Profile") && (
              <TouchableOpacity
                key={index}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {(() => {
                  switch (label) {
                    case "Home":
                      return (
                        <Ionicons
                          name="play-circle"
                          size={28}
                          color={isFocused ? theme.color.primary : "#939595"}
                        />
                      );
                    case "Search":
                      return (
                        <Ionicons
                          name="ios-search"
                          size={28}
                          color={isFocused ? theme.color.primary : "#939595"}
                        />
                      );
                    case "Wallet":
                      return (
                        <Ionicons
                          name="md-wallet"
                          size={28}
                          color={isFocused ? theme.color.primary : "#939595"}
                        />
                      );
                    case "Favorites":
                      return (
                        <Ionicons
                          name="heart"
                          size={28}
                          color={isFocused ? theme.color.primary : "#939595"}
                        />
                      );
                    case "Profile":
                      return (
                        <Ionicons
                          name="person-circle-outline"
                          size={28}
                          color={isFocused ? theme.color.primary : "#939595"}
                        />
                      );
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
