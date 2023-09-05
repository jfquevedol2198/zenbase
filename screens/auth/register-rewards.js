import React from "react";
import { Text, Container, Canvas, Button, Box, RewardsCTA, PremiumCTA } from "components";
import styled from "styled-components/native";
import { useTheme } from "stores/theme";

const FooterWrapper = styled.View`
  width: 100%;
  height: 200px;
`;

const FooterFlex = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;

export default function RegisterRewards({ navigation }) {
  const { theme } = useTheme();

  return (
    <Canvas>
      <Container style={{ flex: 1 }}>
        <Box h="50px" />
        <RewardsCTA />
      </Container>
      <FooterWrapper>
        <Container style={{ flex: 1 }}>
          <FooterFlex>
            <Text style={{ marginTop: 20, marginBottom: 15 }}>
              You can opt-in to Zenbase Rewards at any time from your profile settings.
            </Text>
            <Button
              style={{ marginTop: 3, marginBottom: 3 }}
              title="Yes, I want to earn Zentoken!"
              block
              onPress={() => {}}
            />
            <Button
              style={{ marginTop: 3, marginBottom: 3 }}
              title="No, I don’t want Zentoken"
              variant="secondary"
              block
              onPress={() => {}}
            />
          </FooterFlex>
        </Container>
      </FooterWrapper>
    </Canvas>
  );
}
