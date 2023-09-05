import React from "react";
import Text from "components/text";
import Box from "components/box";
import styled from "styled-components/native";

// Import Images
import CTABackground from "assets/images/cta/bg.png";
import RewardsCTAImage from "assets/images/cta/rewards.png";

// Styled Component
const CTAWrapper = styled.ImageBackground`
  flex: 1;
  overflow: hidden;
  border-radius: ${(props) => props.theme.borderRadius.lg};
  width: 100%;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.md};
  justify-content: flex-start;
  flex-direction: column;
`;

const CTAImageWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

const CTAImage = styled.Image`
  width: 97%;
  height: 100%;
  border-color: #ffffff;
`;

export default function RewardsCTA({ navigation }) {
  return (
    <CTAWrapper source={CTABackground}>
      <Text fontSize="20" fontWeight="600">
        How Can I Use Zentoken (ZENT)?
      </Text>
      <Box h="50px" />
      <CTAImageWrapper>
        <CTAImage source={RewardsCTAImage} resizeMode="contain" />
      </CTAImageWrapper>
    </CTAWrapper>
  );
}
