import React, { useState, useRef } from "react";
import { Text, AnimatedHeaderView } from "components";

import styled from "styled-components/native";
import Canvas from "components/canvas";
import SoundCard from "./soundCard";
import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import tempSongTile from "assets/images/song.png";
import { Container, Box } from "components";
import Header from "./header";
import { ambientSoundData } from "../config";
import { useTimer } from "../contex";

export default function AmbientSoundSelection(props) {
  const { width } = Dimensions.get("window");
  const { selectedAmbientSound } = useTimer();
  const [apiData, setApiData] = useState([]);
  const [ambientSoundSelectionPressed, setAmbientSoundSelectionPressed] = useState(false);
  const [tempSelectedAmbientSound, setTempSlectedAmbientSound] = useState(
    selectedAmbientSound || null
  );

  const cardWidth = width / 2 - 25;

  

  return (
    <>
      <AnimatedHeaderView
        previousScreenName="Timer"
        header={
          <Header
            previousScreenName="Timer"
            title={"Ambient Sound"}
            tempSelectedAmbientSound={tempSelectedAmbientSound}
          />
        }
        inputRange={[10, 50]}
      >
        <Header
          previousScreenName="Timer"
          inputRange={[10, 50]}
          tempSelectedAmbientSound={tempSelectedAmbientSound}
        />
        <Container style={{ flex: 1, position: "relative", zIndex: 2 }}>
          <Title>Ambient Sound</Title>

          <Wrapper>
            <FlatList
              columnWrapperStyle={{ justifyContent: "space-between" }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              numColumns={2}
              data={ambientSoundData || []}
              keyExtractor={(item, index) => index + "_" + item._id}
              renderItem={({ item, index }) => (
                // <Box
                // // pl={10}
                // // ml={}
                // //  mr={index === ambientSoundData?.length - 1 ? "10px" : "10px"}
                // >
                <CardWrapper width={cardWidth} style={{ marginRight: index % 2 == 0 ? 10 : 0 }}>
                  <SoundCard
                    {...item}
                    cardWidth={cardWidth}
                    tempSelectedAmbientSound={tempSelectedAmbientSound}
                    setTempSlectedAmbientSound={setTempSlectedAmbientSound}
                  />
                </CardWrapper>
                // </Box>
              )}
              onEndReachedThreshold={0.5}
              // onEndReached={onEndReached}
            />
          </Wrapper>
        </Container>
      </AnimatedHeaderView>
    </>
  );
}

const Wrapper = styled.View``;
const CardWrapper = styled.View`
  width: ${({ width }) => width}px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const Title = styled(Text)`
  font-weight: 700;
  font-size: ${({ theme: { getSize } }) => getSize(32)}px;
  line-height: ${({ theme: { getSize } }) => getSize(38)}px;
  margin-bottom: ${({ theme: { getSize } }) => getSize(17)}px;
`;
