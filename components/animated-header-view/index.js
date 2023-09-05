import React, { useRef } from "react";
import { Container, Canvas } from "components";
import { Animated, Platform } from "react-native";
import Constants from "expo-constants";
import { BlurView } from "expo-blur";

// EarningTeam Component (Default)
export default function AnimatedHeaderView({ children, header = null, inputRange, hide = false }) {
  const scrollY = useRef(new Animated.Value(0)).current;
  const mainStyle = hide ? { display: "none" } : {};
  return (
    <Canvas style={mainStyle}>
      <Animated.ScrollView
        style={{ width: "100%" }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: 1,
          opacity: scrollY.interpolate({
            inputRange: inputRange,
            outputRange: [0, 1],
          }),
        }}
      >
        <BlurView
          intensity={200}
          style={{
            width: "100%",
            paddingTop: Platform.OS == "ios" ? Constants.statusBarHeight : 15,
            paddingBottom: Platform.OS == "android" ? 5 : 0,
          }}
          tint="dark"
        >
          {header}
        </BlurView>
      </Animated.View>
    </Canvas>
  );
}
