import React from "react";
import Box from "components/box";
import Text from "components/text";
import { FlatList, TouchableOpacity, Platform } from "react-native";
import SongTile from "components/song/tile";
import styled from "styled-components/native";
import Divider from "components/divider";
import { useNavigation } from "@react-navigation/core";
import Constants from "expo-constants";
import { useTheme } from "stores/theme";
import { Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Container } from "..";

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 55px;
`;

const TitleContainer = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* padding-left: 10px;
  padding-right: 10px; */
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const TitleWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
`;

export default function SongList(props) {
  const { id, title, songs, showDivider = true, categories, ...rest } = props;
  const navigation = useNavigation();
  const { theme } = useTheme();

  const songsData = songs.slice(0, 5);

  return (
    <Wrapper>
      <Container>
        {title && (
          <TitleContainer>
            <TitleWrapper
              onPress={() => {
                navigation.navigate("SongList", {
                  type: "section",
                  title,
                  query: id,
                  noTimeFilter: title === "Under 10 Minutes",
                });
              }}
            >
              <Title>{title}</Title>
              <Entypo name="chevron-right" size={24} color={theme.color.information} />
            </TitleWrapper>
          </TitleContainer>
        )}
      </Container>

      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={songsData}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Box pl={index == 0 ? 20 : null} mr={index === songsData?.length - 1 ? "20px" : "10px"}>
            <SongTile allCategories={categories} key={index} song={item} queue={songs} inGrid />
          </Box>
        )}
      />
    </Wrapper>
  );
}
