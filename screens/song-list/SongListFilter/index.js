import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useTheme } from "stores/theme";
import styled from "styled-components/native";
import { Modal } from "react-native";
import { Dimensions } from "react-native";
import Text from "components/text";
import FilterByTime from "./FilterByTime";
import { BlurView } from "expo-blur";

export default function SongListFilter(props) {
  const { timeSlots, activeslot, setActiveSlot } = props;
  const { theme } = useTheme();
  const [visible, setVisible] = useState(false);

  const toggleModal = () => setVisible((pre) => !pre);
  const closeModal = () => setVisible(false);

  const filterProps = { closeModal, timeSlots, activeslot, setActiveSlot };

  return (
    <>
      <ToggleWrapper onPress={toggleModal}>
        <MaterialCommunityIcons
          name="dots-horizontal-circle-outline"
          size={24}
          color={theme.color.primary}
        />
      </ToggleWrapper>
      <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={closeModal}>
        <ModalContentBackDrop onPress={closeModal} />
        <ModalContentWrapper>
          <ModalContentBlur intensity={200} tint="dark">
            {/* <BlurView intensity={150}> */}
            <Label>Filter</Label>
            <FilterByTime {...filterProps} />
            <ClearWrapper
              onPress={() => {
                setActiveSlot("");
                closeModal();
              }}
            >
              <ClearText>Clear</ClearText>
            </ClearWrapper>
          </ModalContentBlur>
          {/* </BlurView> */}
        </ModalContentWrapper>
      </Modal>
    </>
  );
}

const ToggleWrapper = styled.TouchableOpacity`
  right: 18px;
  bottom: 9px;
  position: absolute;
`;

const ModalContentBackDrop = styled.TouchableOpacity`
  width: ${Dimensions.get("window").width}px;
  height: ${Dimensions.get("window").height}px;

  /* position: fixed; */
  /* top: 0;
  left: 0; */
  /* background: red; */
  zindex: 1;
`;

const ModalContentWrapper = styled.View`
  position: absolute;
  right: 7px;
  top: ${Platform.OS == "android" ? 70 : 100}px;
  box-shadow: 0px 4px 25px rgba(0, 0, 0, 0.08);
  width: 181px;
  border-radius: 30px;
  overflow: hidden;
`;
const ModalContentBlur = styled(BlurView)`
  width: 100%;
  /* height: 511px; */

  /* background: rgba(38, 38, 38, 0.9); */

  /* backdrop-filter: blur(12.5px); */

  padding-top: 15px;
  padding-bottom: 16px;
`;

const Label = styled(Text)`
  font-weight: 700;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  margin-bottom: 8px;
`;

const ClearWrapper = styled.TouchableOpacity``;

const ClearText = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
`;
