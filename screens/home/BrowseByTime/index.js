// import Box from "components/box";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";
import timeIcon from "assets/icons/time-tab.png";
import { Container, Text } from "components";

import { useNavigation } from "@react-navigation/native";
import mixpanel from "services/mixpanel";

export default function Shortcuts() {
  const navigation = useNavigation();
  const shortcutsData = [
    { time: 5 },
    { time: 10 },
    { time: 15 },
    { time: 20 },
    { time: 30 },
    { time: 60 },
  ];

  return (
    <Wrapper>
      <Container>
        <Title>Browse by Time</Title>
      </Container>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={shortcutsData}
        horizontal
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const minutes = item.time;
          const time = minutes >= 60 ? Math.round(minutes / 60) : minutes;
          const label = minutes >= 60 ? "HR" : "MIN";
          const title = `${time} ${label === "HR" ? "Hour" : "Minutes"}`;

          return (
            <Box
              pl={index == 0 ? 20 : null}
              mr={index === shortcutsData?.length - 1 ? "20px" : "10px"}
            >
              <Item
                onPress={() => {
                  const props = { title, type: "timer", query: minutes, noTimeFilter: true };
                  mixpanel.track("Select Item List", props);
                  navigation.navigate("SongList", props);
                }}
              >
                <ShortcutImage source={timeIcon} />
                <TimeLabelHolder>
                  <TimeLabel>{time}</TimeLabel>
                  <TimeLabelMin>{label}</TimeLabelMin>
                </TimeLabelHolder>
              </Item>
            </Box>
          );
        }}
      />
      <Container>
        <BottomContent>
          {`Your Will Is Determined By Your Actions`}

        </BottomContent>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
  margin-bottom: 34px;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin-bottom: 20px;
  margin-top:10px
`;

const Item = styled.TouchableOpacity`
  position: relative;
  margin-bottom: 14px;
`;
const TimeLabelHolder = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-20px, -22px);
  width: 40px;
`;
const TimeLabel = styled(Text)`
  font-weight: 600;
  font-size: 23.1818px;
  line-height: 28px;
  text-align: center;
`;
const TimeLabelMin = styled(Text)`
  font-weight: 600;
  font-size: 11.59px;
  line-height: 13.83px;
  text-align: center;
`;
const ShortcutImage = styled.Image`
  width: 85px;
  height: 85px;
`;

const BottomContent = styled(Text)`
  color: ${({ theme }) => theme?.color?.description};
  align-self:center
`;
