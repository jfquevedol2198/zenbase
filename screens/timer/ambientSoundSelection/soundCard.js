import styled from "styled-components/native";
import { Text } from "components";
import checkIcon from "assets/icons/active-circle-check.png";

export default function soundCard(props) {
  const {
    _id,
    title = "",
    songImage,
    cardWidth,
    tempSelectedAmbientSound,
    setTempSlectedAmbientSound,
  } = props;

  const current = tempSelectedAmbientSound && _id === tempSelectedAmbientSound;
  return (
    <Wrapper onPress={() => setTempSlectedAmbientSound(current ? null : _id)}>
          {current && <CheckIcon source={checkIcon} />}
      <SongImage source={songImage} cardWidth={cardWidth} />
      <Title>{title}</Title>
    </Wrapper>
  );
}

const Wrapper = styled.TouchableOpacity`
  width: 100%;
`;

const CheckIcon = styled.Image`
  position: absolute;
  z-index: 2;
  top: ${({ theme: { getSize } }) => getSize(10)}px;
  right: ${({ theme: { getSize } }) => getSize(10)}px;
  width: ${({ theme: { getSize } }) => getSize(32)}px;
  height: ${({ theme: { getSize } }) => getSize(32)}px;
`;

const SongImage = styled.Image`
  width: ${({ cardWidth }) => cardWidth}px;
  height: ${({ cardWidth }) => cardWidth}px;
  border-radius: 10px;
`;

const Title = styled(Text)`
  font-weight: 600;
  font-size: ${({ theme: { getSize } }) => getSize(20)}px;
  line-height: ${({ theme: { getSize } }) => getSize(30)}px;
`;
