// Import Dependencies
import React, { useState, useEffect } from "react";
import { Platform, TouchableOpacity, FlatList,View,ActivityIndicator } from "react-native";
import { Text, Container, Canvas, SongTile, NavigationPadding, Box } from "components";
import styled from "styled-components/native";
import Constants from "expo-constants";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { Dimensions } from "react-native";
// Import Images
import { useTheme } from "stores/theme";
import SongListFilter from "./SongListFilter";
import { useInfiniteSearch, useSearch } from "query/songs";
import { useQueryCategory } from "query/category";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import mixpanel from "services/mixpanel";
import StackNavigatorTabBar from "../../components/tab-bar/stack-navigator";
import SongTileImage from "./SongTileImage";

// Styled Component
const Header = styled.SafeAreaView`
  /* background-color: #0f0f10; */
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: ${(Platform.OS == "ios" ? Constants.statusBarHeight : 5) + 45}px;
`;

const HeaderButtons = styled.View`
  z-index: 1;

  position: absolute;
  top: ${() => (Platform.OS == "android" ? "12px" : Constants.statusBarHeight + 8.5 + "px")};
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 50px;
  padding-left: ${(props) => props.theme.spacing.md};
`;

const SongListWrapper = styled.View`
  width: 105%;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
`;

const SongTileWrapper = styled.View`
  width: 50%;
  /* flex-direction: row; */
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ListImage = styled.Image`
  width: 51px;
  height: 30px;
  border-radius: ${(props) => props.theme.borderRadius.md};
`;

export default function SongList({ route, navigation,onEndReached  }) {

  const [refreshHeaderZindex, setRefreshHeaderZindex] = useState(0);
  const timeSlots = [
    { time: "1-10", timeStart: 0, timeEnd: 600 },
    { time: "10-20", timeStart: 600, timeEnd: 20 * 60 },
    { time: "20-45", timeStart: 20 * 60, timeEnd: 45 * 60 },
    { time: "1+", label: "HR", timeStart: 60 * 60 },
  ];

  const [activeslot, setActiveSlot] = useState("");

  const timeFilterProps = { timeSlots, activeslot, setActiveSlot };

  const { title = "Explore", type, query, noTimeFilter = false } = route.params;
  const { data: categoryData } = useQueryCategory();
  const { theme } = useTheme();

  const activeslotIndex = timeSlots.findIndex((d) => d.time === activeslot);
  const timeQueryProps = activeslot !== "" ? { ...timeSlots[activeslotIndex] } : {};
  const [isLoading, setIsLoading] = useState(true);

  const { data, hasNextPage, fetchNextPage } = useInfiniteSearch(type, {
    query,
    ...timeQueryProps,
  });
  
  const songs = data?.pages?.reduce((accumulator, page) => {
    let pageSongs = [];
    if (page && page.results && page.results.length > 0) {
      pageSongs = page.results;
    }
    if (page && page.songs && page.songs.length > 0) {
      pageSongs = page.songs;
    }
    return [...accumulator, ...pageSongs];
  }, []);
  
  useEffect(() => {
    if (data) setIsLoading(false);
  }, [data]);
  const [imageLoading, setImageLoading] = useState({});
  const handleImageLoad = (songId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [songId]: false, // Set the loading status for this song's image to false
    }));
  };
  
  const handleImageError = (songId) => {
    setImageLoading((prevState) => ({
      ...prevState,
      [songId]: false, // Set the loading status for this song's image to false
    }));
  };
  return (
    <>
    <HeaderWrapper intensity={150} tint="dark" blurType="dark" style={{ zIndex: refreshHeaderZindex + 2 }}>
        <HeaderButtons>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="ios-chevron-back" size={26} color={theme.color.primary} />
          </TouchableOpacity>
        </HeaderButtons>
        <Header>
          <Label>{title}</Label>
          {!noTimeFilter && <SongListFilter {...timeFilterProps} />}
        </Header>
      </HeaderWrapper>
      <Canvas style={{ position: "relative", zIndex: 1 }}>
  
        <Container style={{ flex: 1, position: "relative", zIndex: 2 }}>
          {isLoading ? (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center",alignSelf:'center' }}>
              <ActivityIndicator size="large" color="white " />
            </View>
          ) : (
            <SongListWrapper>
              <FlatList
                style={{
                  paddingTop: 34 + 25,
                  marginBottom: -70,
                }}
                onScroll={() => setRefreshHeaderZindex((p) => 1 - p)}
                columnWrapperStyle={{ justifyContent: "space-between" }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                data={songs || []}
                keyExtractor={(item, index) => index + "_" + item._id}
                renderItem={({ item, index }) => {
               
     return (

        
                  <SongTileWrapper>
                  {imageLoading[item._id] && (
                    <View style={{ }}>
                      <ActivityIndicator size="large" color="white" />
                    </View>
                  )}
                  <SongTile
                    allCategories={categoryData?.categories}
                    style={{ marginBottom: index === songs?.length - 1 ? 160 : 20 }}
                    inGrid
                    song={item}
                    queue={item}
                  />
                  <SongTileImage
                    source={ item?.artwork}
                    onLoad={() => handleImageLoad(item._id)}
                    onError={() => handleImageError(item._id)}
                  />
                </SongTileWrapper>
            )  }}
                onEndReachedThreshold={0.5}
                onEndReached={onEndReached}
              />
  
            </SongListWrapper>
          )}
        </Container>
        <NavigationPadding />
        <StackNavigatorTabBar style={{ zIndex: 9 }} />
      </Canvas>
    </>
  );}
const HeaderWrapper = styled(BlurView)`
  position: absolute;
  z-index: ${({ z = 0 }) => z + 2};
  width: 100%;
  height: ${Platform.OS == "ios" ? 90 : 55}px;
  top: 0px;
  display: flex;
`;

const Label = styled(Text)`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
`;
