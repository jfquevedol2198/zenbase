import { FlatList, Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";
import config from "services/config";
import { Container } from "components";
import { useNavigation } from "@react-navigation/native";
import mixpanel from "services/mixpanel";
import { useState } from "react";
import Timer from "../../timer";


const WINDOW_WIDTH = Dimensions.get("window").width;
const sizeReduce = (WINDOW_WIDTH - 20) / 414;
const TILE_SIZE = Math.min((WINDOW_WIDTH - 40) * 0.5 - 5, 182);

export default function Categories({categories, inGrid = false }) {
  const navigation = useNavigation();
  const [loadingStates, setLoadingStates] = useState({});

  const onPress = (category) => {
        if(category.name==='Timer'){
      navigation.navigate("TimerNavigator", { screen: "Timer" })
    }else{
    const props = {
      type: "category",
      query: category.name,
      title: category.name,
    };
    mixpanel.track("Select Item List", props);
    setLoadingStates((prevState) => ({
      ...prevState,
      [category._id]: true,
    }));
    navigation.navigate("SongList", props);
  };
}
  const handleLoadStart = (categoryId) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [categoryId]: true,
    }));
  };

  const handleLoadEnd = (categoryId) => {
    setLoadingStates((prevState) => ({
      ...prevState,
      [categoryId]: false,
    }));
  };

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={categories}
        horizontal={!inGrid}
        keyExtractor={(item) => item._id}
        {...(inGrid ? { numColumns: 2 } : {})}
        renderItem={({ item, index }) => {
          return (
            <Box
              pl={inGrid ? 20 : index == 0 ? 20 : null}
              mr={index === categories?.length - 1 ? "10px" : "10px"}
            >
              <Item onPress={() => onPress(item)}>
                <ShortcutImage
                  source={{ uri: config.EDGE_IMAGE_PREFIX + item?.artwork }}
                  inGrid={inGrid}
                  onLoadStart={() => handleLoadStart(item._id)} // set loading state to true when image starts loading
                  onLoadEnd={() => handleLoadEnd(item._id)} // set loading state to false when image finishes loading
                />
                {loadingStates[item._id] && <Loader animating={true} />} 
              </Item>
              <Box ml="0px" mr={inGrid ? "10px" : index === categories?.length - 1 ? 0 : "10px"} />
            </Box>
          );
        }}
      />
    </Wrapper>
  );
}

const T = styled.Text``;
const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 34px;
  display: flex;
`;

const Item = styled.TouchableOpacity``;

const ShortcutImage = styled.Image`
  width: ${WINDOW_WIDTH < 414 ? 182 * sizeReduce : 182}px;
  height: ${WINDOW_WIDTH < 414 ? 114 * sizeReduce : 114}px;
  border-radius: 8px;
  margin-bottom: 13px;
`;

const Loader = styled(ActivityIndicator)`
  position: absolute;
  top: 30%;
  left: 40%;
  
`;

