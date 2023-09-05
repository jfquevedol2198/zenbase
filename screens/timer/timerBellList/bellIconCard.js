 import Text from "components/text";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Audio } from 'expo-av';
import { useEffect,useState } from "react";



export default function BellIconCard(props) {
  const { id, title, icon, iconShadowColor, width, height,sound } = props;
// console.log('title',title)
  const shadowStyle = {
    shadowColor: iconShadowColor,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
  };

  const [soundObject, setSoundObject] = useState(new Audio.Sound(null));

  useEffect(() => {
    async function loadSound() {
      try {

        if (sound) {
          const { sound: soundInstance } = await Audio.Sound.createAsync(sound);
          setSoundObject(soundInstance);
          console.log('Sound loaded successfully:', sound);
        }
      } catch (error) {
      
      }
    }
    loadSound();
  }, []);

  // Play the loaded sound
  const playSound = async () => {
    try {
      if (soundObject) {
        await soundObject.playAsync();
       
       
      }
    } catch (error) {
      console.error('Error playing sound', error);
    }
  };

  return (
    <Wrapper>
      <IconWrapper style={shadowStyle}>
        <TouchableOpacity onPress={playSound}>
        <BellIcon source={icon} width={width} height={height}   />
        </TouchableOpacity>
      </IconWrapper>
      <TitleWrapper>
        <Title>{title}</Title>
      </TitleWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.View`
  margin-left: auto;
  margin-right: auto;
`;
const TitleWrapper = styled.View``;

const Title = styled(Text)`
  width: 100%;
  text-align: center;
`;

const IconWrapper = styled.View`
  height: 80px;
  width: 150px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-bottom: ${({ theme: { getSize } }) => getSize(7)}px;
`;

const BellIcon = styled.Image`
  filter: drop-shadow(0px 10px 50px rgba(107, 38, 255, 0.5));

  width: ${({ width, theme: { getSize } }) => getSize(width)}px;
  height: ${({ height, theme: { getSize } }) => getSize(height)}px;
`;

