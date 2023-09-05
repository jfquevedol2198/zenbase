// Import Dependencies
import React, { useState, useEffect } from "react";
import { Alert, ScrollView, View, Platform, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import {
  Text,
  Container,
  Canvas,
  Button,
  IOSList,
  SongTile,
  Box,
  NavigationPadding,
} from "components";
import styled from "styled-components/native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import axios from "services/axios";

// Import Images
import profileImage from "assets/images/artist.png";

// Styled Component
const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

/**
 * **************
 * Profile Header
 * **************
 */
const ProfileHeaderWrapper = styled.ImageBackground`
  background-color: ${(props) => props.theme.color.hud};
  width: 100%;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 270}px;
`;

const ProfileHeaderOverlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.55);
`;

const ProfileHeaderSafeArea = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderImage = styled.Image`
  height: 100px;
  width: 100px;
  border-radius: 50px;
`;

const ProfileHeaderButtons = styled.View`
  z-index: 1;
  position: absolute;
  top: ${() => (Platform.OS == "android" ? "15px" : Constants.statusBarHeight + 5 + "px")};
  /* top: ${() => (Platform.OS == "android" ? "25px" : "55px")}; */
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
  height: auto;
`;

const ProfileHeaderIconWrapper = styled.TouchableOpacity`
  width: 30px;
  height: 30px;
  border-radius: 50px;
  background-color: ${(props) => props.theme.color.secondary};
  justify-content: center;
  align-items: center;
`;

const ProfileHeaderEditButton = styled.TouchableOpacity`
  padding-top: 2px;
  padding-bottom: 2px;
  padding-left: ${(props) => props.theme.spacing.md};
  padding-right: ${(props) => props.theme.spacing.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.lg};
  background-color: ${(props) => props.theme.color.primary};
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

/**
 * **********
 * Components
 * **********
 */

// Profile Header
function ProfileHeader({ profilePicture, route, navigation }) {
  const { theme } = useTheme();

  const { user } = route.params;

  const [isFollowed, setIsFollowed] = useState(user.isFollowed || false);

  const toggleFollow = async () => {
    try {
      setIsFollowed(!isFollowed);
      const { data } = await axios.post(`/auth/${user._id}/follow`);
    } catch (e) {
      setIsFollowed(!isFollowed);
      console.error(e);
    }
  };

  let imageSource = typeof profilePicture == "string" ? { uri: profilePicture } : profilePicture;

  return (
    <ProfileHeaderWrapper source={imageSource} blurRadius={Platform.OS == "android" ? 35 : 100}>
      <ProfileHeaderOverlay>
        <ProfileHeaderButtons>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons
              name="ios-chevron-back"
              size={30}
              style={{ left: 10, top: -5 }}
              color={theme.color.primary}
            />
          </TouchableOpacity>
        </ProfileHeaderButtons>

        <ProfileHeaderSafeArea>
          <ProfileHeaderImage source={imageSource} resizeMode="cover" />
          <Text color="secondary" fontSize="30" fontWeight="bold" style={{ marginTop: 8 }}>
            {user.name}
          </Text>
          <Text color="secondary" fontSize="xl" style={{ marginTop: 8 }}>
            @{user.username}
          </Text>
          <ProfileHeaderEditButton onPress={toggleFollow}>
            <Text color="white" fontSize="md">
              {isFollowed ? "FOLLOWING" : "FOLLOW"}
            </Text>
          </ProfileHeaderEditButton>
        </ProfileHeaderSafeArea>
      </ProfileHeaderOverlay>
    </ProfileHeaderWrapper>
  );
}

export default function UserProfile({ route, navigation }) {
  const { theme } = useTheme();
  const { user } = route.params;
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (user.isArtist) {
      fetchArtistSongs();
    } else {
      fetchRecentlyPlayedSongs();
    }
  }, []);

  const fetchRecentlyPlayedSongs = async () => {
    try {
      let recents = user?.recentlyPlayed;
      if (!recents) {
        return setSongs([]);
      }
      const { data } = await axios.get("/songs/ids?ids=" + recents.join(","));
      setSongs(data.data.results);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchArtistSongs = async () => {
    try {
      const { data } = await axios.get(`/songs/by-artist/${user._id}`);
      setSongs(data.data.results);
    } catch (e) {
      setSongs([]);
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ProfileHeader
        profilePicture={user.image || profileImage}
        route={route}
        navigation={navigation}
      />
      <View style={{ flex: 1, backgroundColor: theme.color.black }}>
        <ScrollView>
          <Container>
            <Text fontSize="20" style={{ marginTop: 22, marginBottom: 22 }}>
              {user.isArtist ? "Uploaded Songs" : "Recently Played"}
            </Text>

            <SongListWrapper>
              {songs.map((song) => (
                <SongTile style={{ marginBottom: 20 }} inGrid song={song} queue={songs} />
              ))}
            </SongListWrapper>
          </Container>

          <NavigationPadding withSafeAreaInsets />
        </ScrollView>
      </View>
    </View>
  );
}
