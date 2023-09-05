import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Dimensions } from "react-native";
import { useMock } from "services/mock";
import styled from "styled-components/native";
import axios from "services/axios";

const WINDOW_WIDTH = Dimensions.get("window").width;
const TILE_SIZE = (WINDOW_WIDTH - 40) * 0.5 - 10;

const CategoryTileImage = styled.Image`
  border-radius: 5px;
  ${(props) => {
    if (props.inGrid) {
      const size = TILE_SIZE;
      if (size < 180) {
        return `
        width: ${size}px;
      `;
      }
    }

    return `
      width: 180px;
    `;
  }}
  height: 112px;
`;

const CategoryTileName = styled.Text`
  color: white;
  font-size: 12px;
  margin-top: 5px;
  position: ${(props) => (props.inlineTitle ? "absolute" : "relative")};
  bottom: ${(props) => (props.inlineTitle ? "4px" : "0px")};
  left: ${(props) => (props.inlineTitle ? "10px" : "0px")};
`;

const CategoryTileWrapper = styled.TouchableOpacity``;

export default function CategoryTile({ category, inlineTitle = false, inGrid = true }) {
  const navigation = useNavigation();

  const fetchSongsByCategoryId = async (categoryId) => {
    try {
      const { data } = await axios.get(`/songs/category-id/${categoryId}`);
      const songs = data.data.results;
      navigation.navigate("SongList", { songs, title: category.name });
    } catch (e) {
      axios.handleError(e);
    }
  };

  return (
    <CategoryTileWrapper
      onPress={() => {
        fetchSongsByCategoryId(category._id);
      }}
    >
      <CategoryTileImage inGrid={inGrid || null} source={{ uri: category?.artwork }} />
      <CategoryTileName inlineTitle={inlineTitle}>{category?.name}</CategoryTileName>
    </CategoryTileWrapper>
  );
}
