// Import Dependencies
import React, { useState, useRef } from "react";
import { ScrollView, Animated, TouchableOpacity, Platform } from "react-native";
import { Text, Container, Canvas, Button, IOSList, SongTile, NavigationPadding } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const BlurHeaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.statusBarHeight}px;
`;

const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ButtonWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-top: ${(props) => props.theme.spacing.xl};
`;

const CustomButton = styled.TouchableOpacity`
  width: 47.5%;
  height: 42px;
  background-color: ${(props) => props.theme.color.hud};
  border-radius: ${(props) => props.theme.borderRadius.md};
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export default function FavoritesType({ route, navigation }) {
  const { theme } = useTheme();
  const { type } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  const [isEdit, setIsEdit] = useState(false);

  return (
    <Canvas>
      <Animated.ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <Header>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              setIsEdit(false);
            }}
          >
            <Ionicons name="ios-chevron-back" size={30} color={theme.color.primary} />
          </TouchableOpacity>
          <Button
            variant={"silent"}
            title={isEdit ? "Done" : "Edit"}
            onPress={() => setIsEdit(!isEdit)}
          />
        </Header>
        <Container style={{ flex: 1 }}>
          <Text fontWeight="bold" fontSize="h2">
            {type}
          </Text>
          {!isEdit && (
            <ButtonWrapper>
              <CustomButton>
                <Ionicons
                  name="ios-play"
                  size={24}
                  color={theme.color.primary}
                  style={{ marginRight: 4 }}
                />
                <Text color="primary">Play</Text>
              </CustomButton>
              <CustomButton>
                <Ionicons
                  name="shuffle-outline"
                  size={24}
                  color={theme.color.primary}
                  style={{ marginRight: 4 }}
                />
                <Text color="primary">Shuffle</Text>
              </CustomButton>
            </ButtonWrapper>
          )}

          <SongListWrapper style={{ marginTop: 20 }}>
            <SongTile
              style={{ marginBottom: 20 }}
              inGrid
              mock
              removable={isEdit}
              onRemove={() => {}}
            />
            <SongTile
              style={{ marginBottom: 20 }}
              inGrid
              mock
              removable={isEdit}
              onRemove={() => {}}
            />
            <SongTile
              style={{ marginBottom: 20 }}
              inGrid
              mock
              removable={isEdit}
              onRemove={() => {}}
            />
            <SongTile
              style={{ marginBottom: 20 }}
              inGrid
              mock
              removable={isEdit}
              onRemove={() => {}}
            />
            <SongTile
              style={{ marginBottom: 20 }}
              inGrid
              mock
              removable={isEdit}
              onRemove={() => {}}
            />
            <SongTile
              style={{ marginBottom: 20 }}
              inGrid
              mock
              removable={isEdit}
              onRemove={() => {}}
            />
          </SongListWrapper>
        </Container>
        <NavigationPadding />
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: scrollY.interpolate({
            inputRange: [20, 50],
            outputRange: [-1, 1],
          }),
          opacity: scrollY.interpolate({
            inputRange: [20, 50],
            outputRange: [0, 1],
          }),
        }}
      >
        <BlurView
          intensity={150}
          style={{
            width: "100%",
            height: (Platform.OS == "ios" ? Constants.statusBarHeight : 15) + 30,
            paddingBottom: Platform.OS == "android" ? 10 : 0,
          }}
          tint="dark"
        >
          <BlurHeaderWrapper>
            <Text style={{ marginBottom: 15 }}>{type}</Text>
          </BlurHeaderWrapper>
        </BlurView>
      </Animated.View>
    </Canvas>
  );
}
