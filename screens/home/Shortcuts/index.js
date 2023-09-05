// import Box from "components/box";
import { Dimensions, FlatList } from "react-native";
import { Text, Container } from "components";
import styled from "styled-components/native";
import groundingIcon from "assets/images/shortcuts/grounding.png";
import timerIcon from "assets/images/shortcuts/timer.png";
import visualizationIcon from "assets/images/shortcuts/visualization.png";
import Box from "components/box";
import { useNavigation } from "@react-navigation/native";

export default function BrowseByTime() {
  const navigation = useNavigation();
  const shortcutsData = [
    { image: timerIcon, to: "Timer" },
    { image: groundingIcon },
    { image: visualizationIcon },
  ];

  return (
    <Wrapper>
      <Container>
        <Title>Shortcuts</Title>
      </Container>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={shortcutsData}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          // const { to = "" } = itme;
          return (
            <Box
              pl={index == 0 ? 20 : null}
              mr={index === shortcutsData?.length - 1 ? "20px" : "10px"}
            >
              <Item onPress={() => (item?.to ? navigation.navigate(item?.to) : null)}>
                <ShortcutImage source={item?.image} />
              </Item>
            </Box>
          );
        }}
      />
    </Wrapper>
  );
}

const WINDOW_WIDTH = Dimensions.get("window").width;
const TILE_SIZE = (WINDOW_WIDTH - 40) * 0.5 - 10;

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 34px;
  display: flex;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 14px;
`;

const Item = styled.TouchableOpacity``;
const sizeReduce = WINDOW_WIDTH / 414;
const ShortcutImage = styled.Image`
  width: ${WINDOW_WIDTH < 414 ? 160 * sizeReduce : 160}px;
  height: ${WINDOW_WIDTH < 414 ? 87.91 * sizeReduce : 87.91}px;
`;
