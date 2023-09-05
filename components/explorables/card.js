import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Dimensions, ActivityIndicator } from "react-native";
import styled from "styled-components/native";
import { Text } from "components";

const CardWrapper = styled.TouchableOpacity`
  margin-top: 20px;
  margin-bottom: 50px;
  margin-right: 10px;
  position: relative;
`;

const CardImage = styled.Image`
  border-radius: 10px;
  width: ${Dimensions.get("window").width * 0.92}px;
  height: 225px;
  overflow: hidden;
`;

const OverlayWrapper = styled.View`
  padding: 0;
  position: absolute;
  bottom: 0;
  height: 40px;
  background: ${({ bgColor }) => bgColor};
  width: ${Dimensions.get("window").width * 0.92}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 0 15px 0 14px;
`;
const Title = styled(Text)`
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
`;

const DurationWrapper = styled.View`
  border-radius: 7.5px;
  padding: 2px 11px;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12.5px);
`;
const Duration = styled(Text)`
  border-radius: 7.5px;
`;

export default function ExplorableCard({
  name,
  duration,
  image,
  link = null,
  isLast = false,
  lableColor,
}) {
  const navigation = useNavigation();
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <CardWrapper
      onPress={() => {
        if (link) {
          navigation.navigate("Play", { _id: link });
        }
      }}
    >
      {imageLoading && (
        <ActivityIndicator size="small" color="#0000ff" style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, alignItems: "center", justifyContent: "center" }} />
      )} 
      <CardImage
        source={image}
        style={[isLast && { marginRight: 15 }]}
        onLoad={() => setImageLoading(false)}
        onError={() => setImageLoading(false)}
      />
      <OverlayWrapper bgColor={lableColor}>
        <Title>{name}</Title>
        <DurationWrapper>
          <Duration>{duration}</Duration>
        </DurationWrapper>
      </OverlayWrapper>
    </CardWrapper>
  );
}