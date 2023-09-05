import { Text } from "components";
import { TouchableOpacity } from "react-native";
import { useTheme } from "stores/theme";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import { useTimer } from "../contex";

export default function Header(props) {
  const { title = "", previousScreenName = "", tempSelectedAmbientSound } = props;
  const { theme } = useTheme();
  const navigation = useNavigation();

  const { setAmbientSoundSelection, setSelectedAmbientSound } = useTimer();
  const goBack = () => {
    setAmbientSoundSelection(false);
  };

  const onDone = () => {
    setSelectedAmbientSound(tempSelectedAmbientSound);
    setAmbientSoundSelection(false);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderTitle>
          <Text>{title}</Text>
        </HeaderTitle>
        <TouchableOpacity style={{ flexDirection: "row", alignItems: "center" }} onPress={goBack}>
          <Ionicons name="ios-chevron-back" size={24} color={theme.color.primary} />
          <Text color="primary" fontSize={14} fontWeight={600}>
            {previousScreenName}
          </Text>
        </TouchableOpacity>

        <HeaderIconWrapper onPress={onDone}>
          <Text color="primary" fontSize={14} fontWeight={600}>
            Done
          </Text>
        </HeaderIconWrapper>
      </HeaderWrapper>
    </>
  );
}

const HeaderWrapper = styled.View`
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const HeaderTitle = styled.View`
  width: 106%;
  height: 100%;
  position: absolute;
  top: 5px;
  left: 0px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const HeaderIconWrapper = styled.TouchableOpacity`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
`;

const HeaderIcon = styled.Image`
  width: 18px;
  height: 18px;
`;
