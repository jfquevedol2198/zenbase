// Import Dependencies
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View, Dimensions } from "react-native";
import {
  Text,
  Container,
  Canvas,
  Button,
  IOSList,
  StackNavigatorTabBar,
  NavigationPadding,
} from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import axios from "services/axios";

// Import Images
import profileImage from "assets/images/artist.png";

// Import Profile Header
import MiniProfileHeader from "screens/profile/header/mini";
import { useFocusEffect } from "@react-navigation/native";

// Styled Component
const UserListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const UserWrapper = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: ${(props) => props.theme.spacing.xl};
`;

const UserImage = styled.Image`
  ${(props) => {
    const size = (Dimensions.get("window").width - 40) * 0.5 - 10;
    if (size < 180) {
      return `
        width: ${size}px;
        height: ${size}px;
      `;
    }

    return `
      width: 180px;
      height: 180px;
    `;
  }}
  border-radius: 100px;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export default function Followers({ route, navigation }) {
  const { theme } = useTheme();
  const { title, users } = route.params;

  // const users = route?.params?.users || [];

  // useFocusEffect(
  //   React.useCallback(() => {
  //     setUsers([]);
  //     fetchUsers();
  //   }, [title])
  // );

  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // const fetchUsers = async () => {
  //   try {
  //     const { data } = await axios.get(`/auth/me/${title.toLowerCase()}`);
  //     setUsers(data.data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  return (
    <>
      <View style={{ flex: 1 }}>
        <MiniProfileHeader
          profilePicture={profileImage}
          route={route}
          navigation={navigation}
          backButtonText="Profile"
        />
        <View style={{ flex: 1, backgroundColor: theme.color.background }}>
          <ScrollView style={{ flex: 1 }}>
            <Container style={{ flex: 1 }}>
              <Text fontWeight="bold" fontSize="h2" style={{ marginTop: 22, marginBottom: 22 }}>
                {title}
              </Text>

              <UserListWrapper>
                {users.map((user) => {
                  return (
                    <UserWrapper
                      onPress={() => {
                        navigation.navigate("UserProfile", { user });
                      }}
                    >
                      <UserImage source={user?.image || profileImage} />
                      <Text color="description">{user.name}</Text>
                    </UserWrapper>
                  );
                })}
              </UserListWrapper>

              <NavigationPadding withSafeAreaInsets />
            </Container>
          </ScrollView>
        </View>
      </View>
      <StackNavigatorTabBar />
    </>
  );
}
