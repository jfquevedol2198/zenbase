import React, { useEffect, useState } from "react";
import {
  Text,
  Container,
  Canvas,
  CategoryGrid,
  Box,
  NavigationPadding,
  ContextMenu,
} from "components";
import styled from "styled-components/native";
import { ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "services/axios";
import ReactNativeShare from "helpers/react-native-share";
import { useAuth } from "stores/auth";
import { useSongQueue } from "stores/song-queue";

const windowsHeight = Dimensions.get("window").height;

// Import Images
import meditationIcon from "assets/icons/meditation.png";
import micIcon from "assets/icons/mic.png";
import Gradient from "assets/images/search-gradient.png";
import { useQueryCategory } from "query/category";
import Categories from "screens/home/Categories";
import ActivitiesTabs from "components/ActivitiesTabs";

// Styled Components
const SearchInput = styled.TextInput`
  background-color: rgba(27, 28, 30, 0.9);
  color: rgba(143, 144, 148, 1);
  width: 100%;
  border-radius: 10px;
  padding-horizontal: 8px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SongListWrapper = styled.View`
  width: ${Dimensions.get("window").width * 0.89}px;
  padding-top: 4px;
  padding-bottom: 8px;
`;

const SongList = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const SongImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 5px;
`;

const ArtistImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  border-radius: 100px;
`;

const SongContentWrapper = styled.View`
  height: 55px;
  width: 83%;
  flex-direction: row;
  justify-content: space-between;
`;

const SongContent = styled.View`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding-left: 8px;
  position: relative;
`;

const SearchGradient = styled.Image`
  position: absolute;
  right: -5px;
  top: 0px;
`;

const IconWrapper = styled.View`
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const SearchBarWrapper = styled.TouchableOpacity`
  width: 100%;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background-color: rgba(38, 38, 38, 1);
  margin-top: 8px;
  margin-bottom: 8px;
  padding-left: 8px;
  padding-right: 8px;
`;

export default function Search({ navigation }) {
  const { theme } = useTheme();
  const { user, updateUser } = useAuth();

  const { updateSongQueue } = useSongQueue();
  const [search, setSearch] = useState("");

  const [contextMenuSong, setContextMenuSong] = useState();
  const [songQueue, setSongQueue] = useState([]);

  // Context Menu Config
  let contextMenuHeight = 0;
  const [contextMenuConfig, setContextMenuConfig] = useState({
    display: false,
    top: 0,
    left: 0,
  });

  const openContextMenu = (event, song) => {
    contextMenuConfig.display = true;
    contextMenuConfig.top = event.nativeEvent.pageY + 15;
    contextMenuConfig.left = event.nativeEvent.pageX - 190;

    if (windowsHeight - contextMenuConfig.top < contextMenuHeight + 20) {
      contextMenuConfig.top -= contextMenuHeight;
      contextMenuConfig.left -= 30;
    }

    setContextMenuConfig({ ...contextMenuConfig });
    setContextMenuSong(song);
  };

  const closeContextMenu = (event) => {
    contextMenuConfig.display = false;
    contextMenuConfig.top = 0;
    contextMenuConfig.left = 0;

    setContextMenuConfig({ ...contextMenuConfig });
    setContextMenuSong();
  };

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      fetchRecentlyPlayedSongs();
    }, [])
  );

  useEffect(() => {
    fetchRecentlyPlayedSongs();
  }, []);

  function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }

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
      setSongQueue(songs.map((song) => song._id));
      let recentSongs = spliceIntoChunks(songs, 4);
      setRecentlyPlayedSongs(recentSongs);
    } catch (e) {
      console.error(e);
    }
  };

  const isSongLiked = () => {
    return user.likedSongs?.includes(contextMenuSong?._id);
  };

  const toggleLikedTrack = () => {
    if (isSongLiked()) {
      updateUser(
        "likedSongs",
        user.likedSongs.filter((_) => {
          if (_ == contextMenuSong?._id) return false;
          return true;
        })
      );
    } else {
      updateUser("likedSongs", [...user.likedSongs, contextMenuSong?._id]);
    }
  };

  const { data, isLoading } = useQueryCategory();
  const tabContent = [
    {
      id: "MEDITATION",
      name: "MEDITATION",
      icon: { source: meditationIcon, width: "18px" },
      component: (
        <>
          <Container>
            <Categories
              inGrid
              isMeditation
              categories={data?.categories?.filter((cat) => !cat.isPodcast)}
            />
          </Container>
        </>
      ),
    },
    {
      id: "PODCASTS",
      name: "PODCASTS",
      icon: { source: micIcon, width: "10.87px" },
      component: (
        <>
          <Container>
            <Categories inGrid categories={data?.categories?.filter((cat) => cat.isPodcast)} />
          </Container>
        </>
      ),
    },
  ];
  return (
    <Canvas>
      <ScrollView>
        <Container>
          <Box mt="20px"></Box>
          <Text fontSize="32" fontWeight="bold">
            Search
          </Text>

          <SearchBarWrapper onPress={() => navigation.navigate("SearchModal")}>
            <Ionicons name="search" size={20} color="rgba(143, 144, 148, 1)" />
            <Text color="rgba(143, 144, 148, 1)" fontSize="md" style={{ marginLeft: 5 }}>
              Artists, Sounds, Friends, and More
            </Text>
          </SearchBarWrapper>

          {/* <SearchInput
            placeholder="Artists, Sounds, Friends, and More"
            placeholderTextColor="rgba(143, 144, 148, 1)"
            value={search}
            onChangeText={(value) => setSearch(value)}
          /> */}

          <>
            {recentlyPlayedSongs.length > 0 && (
              <Text fontSize="20" color="white" fontWeight="600" style={{ marginTop: 10 }}>
                Recent
              </Text>
            )}

            {/* Horizontal Scrollable Song Lists */}
            <ScrollView
              pagingEnabled={true}
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%" }}
              horizontal={true}
            >
              {/* Page 1 */}

              {recentlyPlayedSongs.map((wrapper, index) => (
                <SongListWrapper>
                  {wrapper.map((song) => (
                    <SongList
                      onPress={() => {
                        updateSongQueue(song?._id, songQueue);
                        navigation.navigate("Play", { _id: song?._id });
                      }}
                    >
                      <SongImage source={{ uri: song?.artwork }} />
                      <SongContentWrapper
                        style={[
                          { borderTopWidth: 0 },
                          recentlyPlayedSongs.length - 1 == index && {
                            width: "85%",
                          },
                        ]}
                      >
                        <SongContent>
                          <Text
                            numberOfLines={1}
                            fontSize="14"
                            style={{ marginBottom: 2 }}
                            color="rgba(143, 144, 148, 1)"
                          >
                            {song.artist?.map((artist) => artist.name)?.join(", ") || "Zenbase"}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="clip"
                            fontSize="18"
                            fontWeight="600"
                          >
                            {song?.name}
                          </Text>
                          {/* <Text numberOfLines={1} fontSize="sm" color="secondary">
                            Song • {song.artist?.map((artist) => artist.name).join(", ")}
                          </Text> */}
                          <SearchGradient source={Gradient} />
                        </SongContent>

                        <IconWrapper style={{ paddingLeft: 5 }}>
                          <TouchableOpacity onPress={(event) => openContextMenu(event, song)}>
                            <Feather name="more-horizontal" size={18} color={theme.color.white} />
                          </TouchableOpacity>
                        </IconWrapper>
                      </SongContentWrapper>
                    </SongList>
                  ))}
                </SongListWrapper>
              ))}
            </ScrollView>
          </>

          {/* <CategoryGrid categories={categoriesQuery.data} /> */}
        </Container>
        <ActivitiesTabs title="Wellness Activities" tabContent={tabContent} />
        <NavigationPadding padding={50} />
      </ScrollView>

      <ContextMenu
        display={contextMenuConfig.display}
        top={contextMenuConfig.top}
        left={contextMenuConfig.left}
        closeHandler={closeContextMenu}
        onLayout={({ height }) => {
          contextMenuHeight = height;
        }}
        menuList={[
          isSongLiked()
            ? {
                title: "Remove from Favorites",
                color: "red",
                icon: <Ionicons name="heart-dislike-outline" size={16} color={theme.color.red} />,
                onPress: () => {
                  toggleLikedTrack();
                },
              }
            : {
                title: "Add to Favorites",
                icon: <Ionicons name="heart-outline" size={16} color="white" />,
                onPress: () => {
                  toggleLikedTrack();
                },
              },
          {
            divider: true,
          },
          {
            title: "Share Song...",
            icon: <Ionicons name="ios-share-outline" size={16} color="white" />,
            onPress: () => {
              ReactNativeShare(
                `${user?.name} is inviting you to listen the "${
                  contextMenuSong?.name || "tunes"
                }"! Meditate with ${
                  user?.name
                } only on Zenbase.\n\nJoin here: https://apps.apple.com/in/app/zenbase-meditate-to-earn/id1619530022`,
                () => {
                  // Success
                },
                () => {
                  // Dismissed
                },
                (err) => {
                  // Error
                }
              );
            },
          },
        ]}
      />
    </Canvas>
  );
}
