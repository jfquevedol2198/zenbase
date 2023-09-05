import { useRef, useState } from "react";
import { Animated, Dimensions, FlatList } from "react-native";
import styled from "styled-components/native";
import Text from "../../../components/text";
import { useTimer } from "../contex";
import BellCard from "./bellCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Audio } from 'expo-av'; 




export default function TimerBellList(props) {
  const { timerBellListData = [], setSelectedBell = () => {} } = useTimer();

  const [scrollViewWidth, setScrollViewWidth] = useState(0);
  const boxWidth = scrollViewWidth * 0.5;
  const boxDistance = scrollViewWidth - boxWidth;
  const halfBoxDistance = boxDistance / 2;
  const firstXDistance = halfBoxDistance * -1 + boxWidth;
  const [sound, setSound] = useState();
  const distanceValues = [
    -(halfBoxDistance * -1 + boxWidth * 1),
    halfBoxDistance * -1 + boxWidth * 1,
    halfBoxDistance * -1 + boxWidth * 2,
    halfBoxDistance * -1 + boxWidth * 3,
    halfBoxDistance * -1 + boxWidth * 4,
    halfBoxDistance * -1 + boxWidth * 5,
    halfBoxDistance * -1 + boxWidth * 6,
    halfBoxDistance * -1 + boxWidth * 7,
    halfBoxDistance * -1 + boxWidth * 8,
    halfBoxDistance * -1 + boxWidth * 9,
    halfBoxDistance * -1 + boxWidth * 10,
  ];


  
  return (
    <>
      <Wrapper>

       
       
        <FlatList
          horizontal
          data={timerBellListData}
          snapToAlignment="center"
          decelerationRate="fast"
          automaticallyAdjustContentInsets={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1}
          style={{marginTop:'7%'}}
          renderItem={({ item, index }) => (
            <BellCard key={index} {...item} isLast={index == timerBellListData.length - 1} />
          )}
          snapToInterval={boxWidth}
          contentInset={{ left: halfBoxDistance, right: halfBoxDistance }}
          contentOffset={{ x: firstXDistance, y: 0 }}
          onLayout={(e) => {
            setScrollViewWidth(e.nativeEvent.layout.width);
          }}
          onScroll={(e) => {
            const currentIndex = distanceValues.findIndex((d) => {
              return parseInt(d) === parseInt(e.nativeEvent.contentOffset.x);
            });
            if (currentIndex != -1) {
              setSelectedBell(timerBellListData[currentIndex]?.id);
              
            }
          }}
          keyExtractor={(item, index) => `${index}-${item}`}
        />

      </Wrapper>
    </>
  );
}

const Wrapper = styled.View`


`;
