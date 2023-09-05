import React, { useEffect, useState } from "react";
import { Text, Container, Canvas, Divider, Button, ContextMenu } from "components";
import styled from "styled-components/native";
import { ScrollView, Dimensions, TouchableOpacity } from "react-native";
import { Feather, Ionicons, Entypo } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import SongImg from "assets/images/song.png";
import ArtistImg from "assets/images/artist.png";
import axios from "services/axios";
import { useAuth } from "stores/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ReactNativeShare from "helpers/react-native-share";
import { useSongQueue } from "stores/song-queue";
import useDebounce from "services/useDebounce";

const windowsWidth = Dimensions.get("window").width;
const windowsHeight = Dimensions.get("window").height;

// Import Images
import Gradient from "assets/images/search-gradient.png";

// Styled Components
const SearchInput = styled.TextInput`
  color: white;
  width: 100%;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 15px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize.md};
`;

const SongListWrapper = styled.View`
  width: 99%;
  padding-top: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.md};
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
  width: 86%;
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

const SearchBarContainer = styled.View`
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SearchBarWrapper = styled.View`
  flex: 1;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.hud};
  padding-left: 8px;
  padding-right: 8px;
  margin-right: 16px;
`;

const HeadingWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${(props) => props.theme.spacing.md};
`;

const TrendingWrapper = styled.View`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 8px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TrendingItem = styled.TouchableOpacity`
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TrendingImageWrapper = styled.View`
  position: relative;
`;

const TrendingImage = styled.Image`
  width: ${(windowsWidth / 3) * 0.8}px;
  height: ${(windowsWidth / 3) * 0.8}px;
  border-radius: 10px;
  margin-bottom: 8px;
`;

const TrendingFloatingArtistImage = styled.Image`
  position: absolute;
  width: 30px;
  height: 30px;
  bottom: 5px;
  right: -5px;
  border-radius: 100px;
`;

export default function SearchModal({ navigation }) {
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const { theme } = useTheme();

  const { updateSongQueue } = useSongQueue();
  const [songs, setSongs] = useState([]);
  const [users, setUsers] = useState([]);
  const { user: userAuth, updateUser } = useAuth();

  const [contextMenuSong, setContextMenuSong] = useState();

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

  const isSongLiked = () => {
    return userAuth.likedSongs?.includes(contextMenuSong?._id);
  };

  const toggleLikedTrack = () => {
    if (isSongLiked()) {
      updateUser(
        "likedSongs",
        userAuth.likedSongs.filter((_) => {
          if (_ == contextMenuSong?._id) return false;
          return true;
        })
      );
    } else {
      updateUser("likedSongs", [...userAuth.likedSongs, contextMenuSong?._id]);
    }
  };

  const fetchSongs = async () => {
    const { data } = await axios.get("/songs", {
      params: {
        search,
      },
    });
    setSongs(data.data.results);
  };

  const fetchUsers = async () => {
    const { data } = await axios.get("/auth/search", {
      params: {
        q: search,
      },
    });
    setUsers(data.data);
  };

  useEffect(() => {
    if (debouncedSearchTerm.trim() != "") {
      fetchSongs();
      fetchUsers();
    } else {
      setSongs([]);
      setUsers([]);
    }
  }, [debouncedSearchTerm]);

  const [recentlyPlayedSongs, setRecentlyPlayedSongs] = useState([]);

  useEffect(() => {
    fetchRecentlyPlayedSongs();
  }, []);

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

  const openUser = (user) => {
    // Close Search Model
    navigation.goBack();

    // Navigate to user profile page
    navigation.navigate("UserProfile", { user });
  };

  return (
    <Canvas>
      <Container>
        <SearchBarContainer>
          <SearchBarWrapper>
            <Ionicons name="search" size={20} color="rgba(143, 144, 148, 1)" />
            <SearchInput
              returnKeyType="done"
              autoFocus={true}
              selectionColor={theme.color.white}
              placeholder="Artists, Sounds, Friends, and More"
              placeholderTextColor="rgba(143, 144, 148, 1)"
              value={search}
              onChangeText={(value) => setSearch(value)}
            />
          </SearchBarWrapper>
          <Button
            onPress={() => {
              navigation.goBack();
            }}
            horizontalPadding="0"
            fontSize="16"
            fontWeight="600"
            variant="silent"
            title="Cancel"
          />
        </SearchBarContainer>
      </Container>
      <ScrollView>
        <Container>
          {search == "" && false && (
            <>
              <HeadingWrapper>
                <Text fontSize="xl" fontWeight="600">
                  Trending
                </Text>
              </HeadingWrapper>

              <TrendingWrapper>
                <TrendingItem onPress={() => {}}>
                  <TrendingImageWrapper>
                    <TrendingImage source={ArtistImg} style={{ borderRadius: 100 }} />
                  </TrendingImageWrapper>
                  <Text color="secondary" fontSize="sm">
                    Smooth Guru
                  </Text>
                </TrendingItem>

                <TrendingItem onPress={() => {}}>
                  <TrendingImageWrapper>
                    <TrendingImage source={SongImg} />
                    <TrendingFloatingArtistImage source={ArtistImg} />
                  </TrendingImageWrapper>
                  <Text color="secondary" fontSize="sm">
                    Heart on Fire
                  </Text>
                </TrendingItem>

                <TrendingItem onPress={() => {}}>
                  <TrendingImageWrapper>
                    <TrendingImage source={SongImg} />
                    <TrendingFloatingArtistImage source={ArtistImg} />
                  </TrendingImageWrapper>
                  <Text color="secondary" fontSize="sm">
                    Letting Go
                  </Text>
                </TrendingItem>
              </TrendingWrapper>

              <Divider style={{ height: 0.5 }} />
            </>
          )}

          <HeadingWrapper>
            <Text fontSize="18" fontWeight="600">
              {search == "" && recentlyPlayedSongs.length > 0
                ? "Recent"
                : songs.length > 0 || users.length > 0
                ? "Top Matches"
                : ""}
            </Text>
            {search == "" && recentlyPlayedSongs.length > 0 && (
              <TouchableOpacity
                onPress={async () => {
                  try {
                    await AsyncStorage.removeItem("recents");
                    updateUser("recentlyPlayed", []);
                    setRecentlyPlayedSongs([]);
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <Text fontSize="14" color="primary" fontWeight="600">
                  Clear
                </Text>
              </TouchableOpacity>
            )}
          </HeadingWrapper>

          <SongListWrapper>
            {users
              .filter((user) => user.isArtist && user.username != userAuth.username)
              .map((user) => (
                <SongList
                  onPress={() => {
                    openUser(user);
                  }}
                >
                  <ArtistImage source={user.image ? { uri: user.image } : ArtistImg} />
                  <SongContentWrapper>
                    <SongContent>
                      <Text
                        style={{ marginBottom: 2 }}
                        numberOfLines={1}
                        fontSize="14"
                        color="rgba(143, 144, 148, 1)"
                      >
                        {user.isArtist ? "Artist" : "User"}
                      </Text>
                      <IconWrapper
                        style={{
                          height: "none",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "start",
                        }}
                      >
                        <Text numberOfLines={1} fontSize="18" fontWeight="600">
                          {user?.name}
                        </Text>
                        <Entypo name="chevron-right" size={24} color="rgba(141, 141, 146, 1)" />
                      </IconWrapper>
                      <SearchGradient source={Gradient} />
                    </SongContent>

                    <IconWrapper>
                      <Ionicons
                        name="ios-chevron-forward"
                        size={24}
                        color={theme.color.secondary}
                      />
                    </IconWrapper>
                  </SongContentWrapper>
                </SongList>
              ))}
            {songs.map((song) => (
              <SongList
                onPress={() => {
                  updateSongQueue(
                    song._id,
                    songs.map((song) => song._id)
                  );
                  navigation.navigate("Play", { _id: song._id });
                }}
              >
                <SongImage source={{ uri: song?.artwork }} />
                <SongContentWrapper>
                  <SongContent>
                    <Text
                      style={{ marginBottom: 2 }}
                      numberOfLines={1}
                      fontSize="14"
                      color="rgba(143, 144, 148, 1)"
                    >
                      {song.artist?.map((artist) => artist.name)?.join(", ") || "Zenbase"}
                    </Text>
                    <Text ellipsizeMode="clip" numberOfLines={1} fontSize="18" fontWeight="600">
                      {song?.name}
                    </Text>
                    {/* <Text numberOfLines={1} fontSize="sm" color="secondary">
                      Song •{" "}
                      {song.artist.map((artist) => artist?.name || "Unknown Artist").join(", ")}
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
            {users
              .filter((user) => !user.isArtist && user.username != userAuth.username)
              .map((user) => (
                <SongList
                  onPress={() => {
                    openUser(user);
                  }}
                >
                  <ArtistImage source={user.image ? { uri: user.image } : ArtistImg} />
                  <SongContentWrapper>
                    <SongContent>
                      <Text
                        style={{ marginBottom: 2 }}
                        numberOfLines={1}
                        fontSize="14"
                        color="rgba(143, 144, 148, 1)"
                      >
                        {user.isArtist ? "Artist" : "User"}
                      </Text>
                      <IconWrapper
                        style={{
                          height: "none",
                          flexDirection: "row",
                          justifyContent: "flex-start",
                          alignItems: "start",
                        }}
                      >
                        <Text numberOfLines={1} fontSize="18" fontWeight="600">
                          {user?.name}
                        </Text>
                        <Entypo name="chevron-right" size={24} color="rgba(141, 141, 146, 1)" />
                      </IconWrapper>
                      <SearchGradient source={Gradient} />
                    </SongContent>
                  </SongContentWrapper>
                </SongList>
              ))}

            {search == "" &&
              recentlyPlayedSongs.map((song) => (
                <SongList
                  onPress={() => {
                    updateSongQueue(
                      song._id,
                      recentlyPlayedSongs.map((song) => song._id)
                    );
                    navigation.navigate("Play", { _id: song._id });
                  }}
                >
                  <SongImage source={{ uri: song?.artwork }} />
                  <SongContentWrapper>
                    <SongContent>
                      <Text
                        style={{ marginBottom: 2 }}
                        numberOfLines={1}
                        fontSize="14"
                        color="rgba(143, 144, 148, 1)"
                      >
                        {song.artist?.map((artist) => artist.name)?.join(", ") || "Zenbase"}
                      </Text>
                      <Text ellipsizeMode="clip" numberOfLines={1} fontSize="18" fontWeight="600">
                        {song?.name}
                      </Text>
                      {/* <Text numberOfLines={1} fontSize="sm" color="secondary">
                        Song •{" "}
                        {song.artist.map((artist) => artist?.name || "Unknown Artist").join(", ")}
                      </Text> */}
                      <SearchGradient source={Gradient} />
                    </SongContent>

                    <IconWrapper style={{ paddingLeft: 5 }}>
                      <TouchableOpacity onPress={(event) => openContextMenu(event, song)}>
                        <Feather name="more-horizontal" size={24} color={theme.color.white} />
                      </TouchableOpacity>
                    </IconWrapper>
                  </SongContentWrapper>
                </SongList>
              ))}
            {/* 
            <SongList onPress={() => {}}>
              <ArtistImage source={ArtistImg} />
              <SongContentWrapper>
                <SongContent>
                  <Text>Karunesh</Text>
                  <Text fontSize="sm" color="secondary">
                    Artist
                  </Text>
                </SongContent>

                <IconWrapper>
                  <Ionicons
                    name="ios-chevron-forward"
                    size={24}
                    color={theme.color.secondary}
                  />
                </IconWrapper>
              </SongContentWrapper>
            </SongList> */}
          </SongListWrapper>
        </Container>
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
          // {
          //   title: 'Play Next',
          //   icon: (
          //     <MaterialCommunityIcons
          //       name="page-last"
          //       size={16}
          //       color="white"
          //     />
          //   ),
          //   onPress: () => {},
          // },
          // {
          //   title: 'Play Last',
          //   icon: (
          //     <MaterialCommunityIcons
          //       name="page-first"
          //       size={16}
          //       color="white"
          //     />
          //   ),
          //   onPress: () => {},
          // },
          {
            title: "Share Song...",
            icon: <Ionicons name="ios-share-outline" size={16} color="white" />,
            onPress: () => {
              ReactNativeShare(
                `${user?.name} is inviting you to listen the "${contextMenuSong?.name}"! Meditate with ${user?.name} only on Zenbase.\n\nJoin here: https://apps.apple.com/in/app/zenbase-meditate-to-earn/id1619530022`,
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
