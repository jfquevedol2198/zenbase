import React from "react";
import styled from "styled-components/native";
import { Image, TouchableOpacity } from "react-native";

// Import Images
import zentBackground from "assets/images/wallet/zent-bg.png";
import zentLogo from "assets/logos/zent-coin.png";
import expandVector from "assets/vectors/expand.png";

// Styled Components

/**
 * *********
 * Zent Coin
 * *********
 */
const ParentWrapper = styled.View`
  border-radius: 10px;
  overflow: hidden;
  width: 100%;
  height: 234px;
  margin-bottom: 12px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const ZentBackground = styled.Image`
  position: absolute;
  border-radius: 10px;
  width: 100%;
  top: 35px;
  height: 225px;
`;

const ZentBackgroundBorder = styled.View`
  position: absolute;
  border-radius: 10px;
  width: 100%;
  top: 35px;
  height: 199px;
  border-color: rgba(0, 0, 0, 0.25);
  border-width: 2px;
`;

const ZentExpandIconWrapper = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
  flex-direction: row-reverse;
  width: 100%;
`;

const ZentLogo = styled.Image`
  width: ${({ theme: { getSize } }) => getSize(117)}px;
  height: ${({ theme: { getSize } }) => getSize(128)}px;
  position: relative;
`;

const ZentTokens = styled.Text`
  font-size: 32px;
  color: #fff;
  font-weight: bold;
  margin-top: 12px;
`;

const ZentValue = styled.Text`
  font-size: 18.5px;
  color: #f7f8fa;
`;

// ZentCoin Component
export default function ZentTokenBanner({ tokens, usd, onPress = null }) {
  const Banner = (
    <ParentWrapper>
      <ZentBackground source={zentBackground} />
      {/* <ZentBackgroundBorder /> */}
      {/* {onPress && <ZentExpandIconWrapper>
        <Image source={expandVector} style={{ width: 16, height: 16 }} />
      </ZentExpandIconWrapper>} */}
      <ZentLogo source={zentLogo} resizeMode="contain" />
      <ZentTokens>{tokens || 0} ZENT</ZentTokens>
      <ZentValue>{usd || 0} USD</ZentValue>
    </ParentWrapper>
  );

  return onPress ? (
    <TouchableOpacity style={{ width: "100%" }} onPress={onPress}>
      {Banner}
    </TouchableOpacity>
  ) : (
    Banner
  );
}
