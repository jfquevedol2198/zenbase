// Import Dependencies
import React, { useState, useEffect, useRef } from "react";
import { Animated, ScrollView, View, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import MiniProfileHeader from "screens/profile/header/mini";

import ProfileHeader from "screens/profile/header";
import { useAuth } from "stores/auth";
import axios from "services/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useSongQueue } from "stores/song-queue";

// Import Images
import profileImage from "assets/images/artist.png";
import journalIcon from "assets/icons/journal.png";
import zentokenIcon from "assets/icons/zentoken.png";
import followingIcon from "assets/icons/following.png";
import followersIcon from "assets/icons/followers.png";
import wellnessIcon from "assets/icons/wellness.png";

// Styled Component
const SongListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Icon = styled.Image``;

const WellnessActivityWrapper = styled.View`
  width: 100%;
  height: ${Dimensions.get("window").height * 0.3}px;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Profile({ route, navigation }) {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    React.useCallback(() => {
      fetchRecentlyPlayedSongs();
      fetchFollowers();
      fetchFollowing();
    }, [])
  );

  useEffect(() => {
    fetchRecentlyPlayedSongs();
    fetchFollowers();
    fetchFollowing();
  }, []);

  const fetchFollowers = async () => {
    try {
      const { data } = await axios.get(`/auth/me/followers`);
      setFollowers(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get(`/auth/me/following`);
      setFollowing(data.data);
    } catch (e) {
      console.error(e);
    }
  };

  const fetchRecentlyPlayedSongs = async () => {
    try {
      let recents = JSON.parse(await AsyncStorage.getItem("recents"));
      if (!recents) {
        return setRecentlyPlayedSongs([]);
      }
      const { data } = await axios.get("/songs/ids?ids=" + recents.join(","));
      const songs = [];

      for (let songId of recents) {
        const song = data.data.results.find((song) => song._id == songId);
        if (song) {
          songs.push(song);
        }
      }

      setRecentlyPlayedSongs(songs);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: theme.color.background }}>
        <Animated.ScrollView
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
            useNativeDriver: true,
          })}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          <ProfileHeader profilePicture={profileImage} route={route} navigation={navigation} />
          <Container>
            <IOSList
              style={{ marginTop: 12, borderRadius: 10 }}
              notDefault
              transparent
              data={[
                // {
                //   icon: <Ionicons name="ios-musical-note" size={24} color={theme.color.primary} />,
                //   title: 'Sounds',
                //   onPress: () => {
                //     navigation.navigate('Sounds');
                //   }
                // },
                {
                  icon: (
                    <Icon
                      style={{ width: 24, height: 24 }}
                      source={journalIcon}
                      resizeMode="contain"
                    />
                  ),
                  title: "My Journal",
                  onPress: () => {
                    navigation.navigate("Journal");
                  },
                },
                {
                  icon: (
                    <Icon
                      style={{ width: 24, height: 24, tintColor: "rgba(255, 255, 255, 0.35)" }}
                      source={zentokenIcon}
                      resizeMode="contain"
                    />
                  ),
                  chevronColor: "rgba(141, 141, 146, 0.35);",
                  color: "rgba(255, 255, 255, 0.55)",
                  title: "Earning Team",
                  onPress: () => {
                    // navigation.navigate("EarningTeam", {
                    //   previousScreenName: "Profile",
                    // });
                  },
                },
                {
                  icon: (
                    <Icon
                      style={{
                        width: 24,
                        height: 22,
                        tintColor:
                          following.length > 0 ? theme.color.primary : "rgba(255, 255, 255, 0.35)",
                      }}
                      source={followingIcon}
                      resizeMode="contain"
                    />
                  ),
                  title: "Following",
                  chevronColor:
                    following.length > 0 ? theme.color.description : "rgba(141, 141, 146, 0.35);",
                  color: following.length > 0 ? theme.color.white : "rgba(255, 255, 255, 0.55)",
                  onPress: () => {
                    if (following.length > 0) {
                      navigation.navigate("Followers", {
                        title: "Following",
                        users: following,
                      });
                    }
                  },
                },
                {
                  icon: (
                    <Icon
                      style={{
                        width: 34,
                        height: 24,
                        marginLeft: -10,
                        tintColor:
                          followers.length > 0 ? theme.color.primary : "rgba(255, 255, 255, 0.35)",
                      }}
                      source={followersIcon}
                      resizeMode="contain"
                    />
                  ),
                  color: followers.length > 0 ? theme.color.white : "rgba(255, 255, 255, 0.55)",
                  chevronColor:
                    followers.length > 0 ? theme.color.description : "rgba(141, 141, 146, 0.35);",
                  title: "Followers",
                  onPress: () => {
                    if (followers.length > 0) {
                      navigation.navigate("Followers", {
                        title: "Followers",
                        users: followers,
                      });
                    }
                  },
                },
              ]}
            />

            {recentlyPlayedSongs.length > 0 ? (
              <>
                <Text fontSize="24" fontWeight="600" style={{ marginTop: 22, marginBottom: 22 }}>
                  Wellness Activity
                </Text>
                <SongListWrapper>
                  {recentlyPlayedSongs.map((song) => (
                    <SongTile
                      style={{ marginBottom: 20 }}
                      inGrid
                      song={song}
                      queue={recentlyPlayedSongs}
                    />
                  ))}
                </SongListWrapper>
              </>
            ) : (
              <>
                <WellnessActivityWrapper>
                  <Icon
                    style={{ width: 32, height: 32, marginBottom: 15 }}
                    source={wellnessIcon}
                    resizeMode="contain"
                  />
                  <Text fontSize="24" fontWeight="700" color="#939595">
                    Wellness Activity
                  </Text>
                  <Text fontSize="18" fontWeight="400" color="#939595" style={{ marginTop: 5 }}>
                    Your recent activities will appear here.
                  </Text>
                </WellnessActivityWrapper>
              </>
            )}
          </Container>

          <NavigationPadding withSafeAreaInsets />
        </Animated.ScrollView>
      </View>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          opacity: scrollY.interpolate({
            inputRange: [120, 200],
            outputRange: [0, 1],
          }),
          zIndex: scrollY.interpolate({
            inputRange: [120, 200],
            outputRange: [-1, 1],
          }),
        }}
      >
        <MiniProfileHeader
          profilePicture={profileImage}
          route={route}
          navigation={navigation}
          backButton={false}
          settingButton
        />
      </Animated.View>
    </>
  );
}
