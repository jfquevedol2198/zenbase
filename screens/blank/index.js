import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
// import categories from "mock/categories";
import Container from "components/container";
import SongTile from "components/song/tile";
import song from "mock/song";
import Canvas from "components/canvas";
const songs = [song, song, song, song, song];

export default function Blank() {
  return (
    <Canvas>
      <FlatList
        data={songs}
        horizontal
        renderItem={({ item, index }) => <SongTile song={item} key={index} />}
      />
    </Canvas>
  );
}
