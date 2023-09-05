import React, { useRef, useState,useEffect} from "react";
import ExplorableCard from "components/explorables/card";
import CardImage1 from "assets/images/explorable/card-1.png";
import CardImage2 from "assets/images/explorable/card-2.png";
import CardImage3 from "assets/images/explorable/card-3.png";
import CardImage4 from "assets/images/explorable/card-4.png";
import CardImage5 from "assets/images/explorable/start-here.png";
import CardBackgroung5 from "assets/images/explorable/card-5-bg.png";
import ExplorableLinearGradient from "assets/images/explorable-gradient.png";
import { FlatList, Animated, Dimensions,ActivityIndicator,View } from "react-native";
import styled from "styled-components/native";

const cards = [
  {
    name: "Introduction to Meditation",
    image: CardImage5,
    duration: "10 min",
    link: "64a427c0d2d7e154414277c5",

    lableColor: "#6F39C6",
    background: CardBackgroung5,
    index: 0,
  },
  {
    name: "Daily Meditation",
    image: CardImage4,
    duration: "5 min",
    link: "64a42ca1d2d7e154414278e8",
    lableColor: "#3A74A2",
    index: 1,
  },
  {
    name: "Morning Gratitude",
    image: CardImage3,
    duration: "5 min",
    link: "64a42d33d2d7e15441427a74",
    lableColor: "#C96971",
    index: 2,
  },
  {
    name: "Deep Sleep",
    image: CardImage2,
    duration: "5 min",
    link: "64a42dd9d2d7e15441427a7d",
    lableColor: "#B89726",
    index: 3,
  },
  {
    name: "Guided Meditation",
    image: CardImage1,
    duration: "5 min",
    link: "64a42e22d2d7e15441427a86",
    lableColor: "#0096A0",
    index: 4,
  },
];

const BackdropImage = styled.Image`
  height: 390px;
  position: absolute;
  z-index: -1000;
`;

const BackdropOverlay = styled.Image`
   position: absolute;
  width: 200%;
  top: 340px;
  left: 0px;
  height: 60px;
  z-index: -900;
  resize-mode: stretch;
`;

function BackgroundLoader(props) {
  const opacity = useRef(new Animated.Value(0)).current;
 
  const onLoad = () => {
    Animated.sequence([
      Animated.timing(opacity, { toValue: 0.2, duration: 0, useNativeDriver: true }),
      Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
    ]).start();
  };

  return <Animated.Image onLoad={onLoad} {...props} style={[{ opacity: opacity }, props.style]} />;
}

export default function Explorables() {
  const [currentBackdrop, setCurrentBackdrop] = useState(CardBackgroung5);
  const [currentBackdropIndex, setCurrentBackdropIndex] = useState(0);

  const onViewableItemsChangedRef = useRef(({ viewableItems, index }) => {
    if (viewableItems.length > 0) {
      setCurrentBackdropIndex(viewableItems[0]?.item?.index);
      setCurrentBackdrop(viewableItems[0]?.item?.background || viewableItems[0]?.item?.image);
    }
  });
  const viewabilityConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 55,
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // simulate a delay to fetch the card data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      <BackgroundLoader
        source={currentBackdrop}
        blurRadius={currentBackdropIndex !== 0 ? 100 : 0}
        style={{
          height: Dimensions.get('screen').height*0.75,
          position: "absolute",
          zIndex: -800,
          width: "100%",
          // marginTop:"1%"
        }}
      />
      <BackdropOverlay source={ExplorableLinearGradient} />
    
      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <FlatList
          horizontal
          // data={cards}
          style={{ paddingLeft: 15 }}
          snapToInterval={Dimensions.get("window").width * 0.92 + 10}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onViewableItemsChanged={onViewableItemsChangedRef.current}
          viewabilityConfig={viewabilityConfigRef.current}
          renderItem={({ item, index }) => (
            <ExplorableCard key={index} {...item} isLast={index == cards.length - 1} />
          )}
        />
      )}
    </>
  )}


