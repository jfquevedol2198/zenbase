// import Box from "components/box";
import { FlatList } from "react-native";
import styled from "styled-components/native";
import Box from "components/box";
import timeIcon from "assets/icons/time-tab.png";
import { Text } from "components";

import { useNavigation } from "@react-navigation/native";

import { FontAwesome5 } from "@expo/vector-icons";
import { useTheme } from "stores/theme";

export default function FilterByTime(props) {
  const { theme } = useTheme();
  const {
    closeModal = () => {},
    timeSlots = [],
    activeslot = "",
    setActiveSlot = () => {},
  } = props;
  const navigation = useNavigation();

  const selectSlote = (time) => {
    setActiveSlot(time);
    setTimeout(() => {
      closeModal();
    }, 400);
  };

  return (
    <Wrapper>
      <FlatList
        showsHorizontalScrollIndicator={false}
        data={timeSlots}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => {
          const { label = "MIN", time } = item;
          return (
            <BoxWrapper>
              <Box mb={index === timeSlots?.length - 1 ? 0 : "10px"}>
                <Item onPress={() => selectSlote(time)}>
                  <ShortcutImage source={timeIcon} />
                  <TimeLabelHolder>
                    <TimeLabel>{time}</TimeLabel>
                    <TimeLabelMin>{label}</TimeLabelMin>
                  </TimeLabelHolder>
                  {activeslot === time && (
                    <CheckIcon name="check" size={15} color={theme.color.primary} />
                  )}
                </Item>
              </Box>
            </BoxWrapper>
          );
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.View`
  width: 100%;
`;
const CheckIcon = styled(FontAwesome5)`
  position: absolute;
  right: -${({ size }) => size + 15}px;
  top: ${({ size }) => 87 / 2 - size / 2}px;
`;
const BoxWrapper = styled.View``;
const Item = styled.TouchableOpacity`
  position: relative;
  margin-bottom: 14px;
`;
const TimeLabelHolder = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-40px, -22px);
  width: 80px;
`;
const TimeLabel = styled(Text)`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
`;
const TimeLabelMin = styled(Text)`
  font-weight: 600;
  font-size: 12px;
  line-height: 14.32px;
  text-align: center;
`;
const ShortcutImage = styled.Image`
  width: 88px;
  height: 87px;
`;
