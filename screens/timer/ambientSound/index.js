import Text from "components/text";
import styled from "styled-components/native";
import { Entypo } from "@expo/vector-icons";
import { useTheme } from "stores/theme";
import { useNavigation } from "@react-navigation/core";
import { useTimer } from "../contex";
import { ambientSoundData } from "../config";
import mixpanel from "services/mixpanel";

export default function AmbientSound(props) {
  const { selsctedSound = "" } = props;
  const { theme } = useTheme();
  const navigation = useNavigation();

  const { selectedAmbientSound, setAmbientSoundSelection } = useTimer();
  const selectedIndex = ambientSoundData?.findIndex(
    ({ _id }) => selectedAmbientSound && _id === selectedAmbientSound
  );
  const selectedSound = selectedIndex != -1 ? ambientSoundData[selectedIndex]?.title : "None";


  // const handlePress = () => {
  //   const category = { name: "Restorative" }; // Create a dummy category object
  //   const props = {
  //     type: "category",
  //     query: category.name,
  //     title: category.name,
  //   };
    
  //   mixpanel.track("Select Item List", props);
    
  //   navigation.navigate("SongList", props);
  // };

  return (
    <Wrapper onPress={() => setAmbientSoundSelection(true)}>
    {/* // <Wrapper onPress={handlePress}> */}
      <Title>Ambient Sound</Title>
      <SelectedWrapper>
        <SelectedSound>{selectedSound}</SelectedSound>
        <Entypo name="chevron-right" size={20} color={theme.color.information} />
      </SelectedWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  width: 100%;
  background:${({ theme: { color } }) => color?.card};
  border-radius: ${({ theme: { getSize } }) => getSize(15)}px;
  height: ${({ theme: { getSize } }) => getSize(64)}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme: { getSize } }) => `0 ${getSize(25 - 7)}px 0 ${getSize(20.5)}px`}};
  margin-bottom: ${({ theme: { getSize } }) => getSize(40)}px;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(19)}px;
`;

const SelectedWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;
const SelectedSound = styled(Text)``;
