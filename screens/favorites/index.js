// Import Dependencies
import React, { useState, useRef, useEffect } from "react";
import { Animated, Platform } from "react-native";
import { Text, Container, Canvas, Button, IOSList, SongTile, NavigationPadding } from "components";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";

// Import Images
import axios from "services/axios";
import { useIsFocused } from "@react-navigation/native";
import { useAuth } from "stores/auth";

// Styled Component
const Header = styled.View`
  width: 100%;
  flex-direction: row-reverse;
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

const ListImage = styled.Image`
  width: 51px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

export default function Favorites({ route, navigation }) {
  const scrollY = useRef(new Animated.Value(0)).current;

  const isFocused = useIsFocused();

  const [isEdit, setIsEdit] = useState(false);

  const [songs, setSongs] = useState([]);

  const [categories, setCategories] = useState([]);

  const [likedCategories, setLikedCategories] = useState([]);

  const { user, updateUser } = useAuth();

  const fetchSongs = async () => {
    const { data } = await axios.get("/songs/liked");
    setSongs(data.data.results);
  };

  useEffect(() => {
    fetchSongs();
  }, [isFocused]);

  // useEffect(() => {
  //   const accumulatedCategories = songs
  //     .map((song) => {
  //       return song?.categories;
  //     })
  //     .reduce((accumulator, current) => {
  //       if (!current) return;
  //       return [...accumulator, ...current];
  //     }, []);

  //   const filteredCategories = [...new Set(accumulatedCategories)].map((categoryId) => {
  //     return categories.find((category) => category._id == categoryId);
  //   });
  //   setLikedCategories(filteredCategories);
  // }, [songs, categories]);

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
          <Button
            variant={"silent"}
            title={isEdit ? "Done" : "Edit"}
            onPress={() => setIsEdit(!isEdit)}
          />
        </Header>
        <Container style={{ flex: 1 }}>
          <Text fontWeight="bold" fontSize="h2">
            Liked Tracks
          </Text>
          {!isEdit && (
            <IOSList
              style={{ marginTop: 20, marginBottom: 10 }}
              notDefault
              transparent
              data={likedCategories.map((category) => {
                return {
                  icon: <ListImage source={{ uri: category?.artwork }} />,
                  title: category.name,
                  onPress: () => {
                    navigation.navigate("SongList", {
                      songs: songs.filter((song) => song?.categories.includes(category?._id)),
                      title: category?.name,
                    });
                    // navigation.navigate('FavoritesType', {
                    //   type: category.name,
                    //   category,
                    //   _id: category._id,
                    // });
                  },
                };
              })}
            />
          )}

          <SongListWrapper style={{ marginTop: 20 }}>
            {songs.map((song) => {
              return (
                <SongTile
                  style={{ marginBottom: 20 }}
                  inGrid
                  queue={songs}
                  removable={isEdit}
                  onRemove={() => {
                    updateUser(
                      "likedSongs",
                      user?.likedSongs.filter((_) => {
                        if (song._id == _) return false;
                        return true;
                      })
                    );
                    setSongs(songs.filter((_) => _._id != song._id));
                  }}
                  song={song}
                />
              );
            })}
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
            <Text style={{ marginBottom: 15 }}>Liked Tracks</Text>
          </BlurHeaderWrapper>
        </BlurView>
      </Animated.View>
    </Canvas>
  );
}
