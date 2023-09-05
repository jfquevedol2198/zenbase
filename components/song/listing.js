import Text from "components/text";
import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "stores/theme";

const SongWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const SongImage = styled.Image`
  width: 35px;
  height: 35px;
  margin-right: 15px;
  border-radius: 2px;
`;

const SongTextWrapper = styled.View`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Divider = styled.View`
  background-color: rgba(172, 178, 155, 0.5);
  height: 1px;
  width: 100%;
  margin-bottom: 5px;
  margin-top: 7px;
`;

const ButtonMore = styled.TouchableOpacity`
  position: absolute;
  right: 50px;
  top: 20px;
`;

export default function SongListing({ song, index }) {
  const { theme } = useTheme();
  return (
    <SongWrapper onPress={() => alert("Pressed song: " + song?.name)}>
      <SongImage source={{ uri: song.artwork }} />
      <SongTextWrapper>
        {index === 0 && <Divider />}
        <SongTextWrapper>
          <Text>{song.name}</Text>
          <Text color="secondary">Song • {song.artist.name}</Text>
        </SongTextWrapper>
        <ButtonMore onPress={() => alert("Press more on song: " + song?.name)}>
          <Feather name="more-horizontal" size={24} color={theme.color.white} />
        </ButtonMore>
        <Divider />
      </SongTextWrapper>
    </SongWrapper>
  );
}
