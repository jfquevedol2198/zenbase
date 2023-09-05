// Import Dependencies
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { Text, Container, Canvas, Button, IOSList, SongTile, NavigationPadding } from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "stores/theme";

// Import Images
import profileImage from "assets/images/artist.png";

// Import Profile Header
import MiniProfileHeader from "screens/profile/header/mini";

// Styled Component
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
  padding-bottom: ${(props) => props.theme.spacing.xl};
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

export default function Sounds({ route, navigation }) {
  const { theme } = useTheme();

  const [isEdit, setIsEdit] = useState(false);

  return (
    <View style={{ flex: 1 }}>
      <MiniProfileHeader
        profilePicture={profileImage}
        route={route}
        navigation={navigation}
        secondaryButton={isEdit ? "Done" : "Edit"}
        secondaryButtonOnPress={() => {
          setIsEdit(!isEdit);
        }}
      />
      <View style={{ flex: 1, backgroundColor: theme.color.black }}>
        <ScrollView style={{ flex: 1 }}>
          <Container style={{ flex: 1 }}>
            <Text fontWeight="bold" fontSize="h2" style={{ marginTop: 22 }}>
              Sounds
            </Text>

            {isEdit ? (
              <IOSList
                style={{ marginTop: 18, marginBottom: 18 }}
                withoutChevron
                transparent
                data={[
                  {
                    icon: (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          marginLeft: 10,
                          backgroundColor: "#39C859",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="ios-add"
                          size={18}
                          color="white"
                          style={{ marginLeft: 2 }}
                        />
                      </View>
                    ),
                    title: "Post new sound",
                    color: "primary",
                    onPress: () => {},
                  },
                ]}
              />
            ) : (
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

            <SongListWrapper>
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

          <NavigationPadding withSafeAreaInsets />
        </ScrollView>
      </View>
    </View>
  );
}
