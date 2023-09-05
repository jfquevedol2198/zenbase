import React from "react";
import { Canvas, Container, Text } from "components";
import styled from "styled-components/native";
import { ActivityIndicator, Image, StatusBar } from "react-native";
import { Video } from "expo-av";

// Import images
import ZenbaseFullLogo from "assets/images/zenbase-full-white-logo.png";
import { useAuth } from "stores/auth";
import ZentbaseVectorWhite from "assets/vectors/zentoken-flat-circle-logo.png";

// Import Videos
import BackgroundVideo from "assets/videos/water.mp4";

// Styled Component
const BackgroundWrapper = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${(props) => props.theme.color.background};
`;

const ZenbaseLogo = styled.Image`
  width: 261px;
  height: 71px;
`;

/**
 * ****
 * Card
 * ****
 */
const CardWrapper = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const CardBody = styled.View`
  flex: 2;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardFooterMargin = styled.View`
  height: 20%;
`;

const BottomView = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding-top: 70px;
  flex: 1;
`;

// Splash Screen (Default)
export default function SplashScreen({ route, navigation }) {
  return (
    <Canvas>
      <StatusBar barStyle="light-content" />

      <Video
        source={BackgroundVideo}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
        rate={1}
        shouldPlay={true}
        isLooping={true}
        volume={0}
        muted={true}
        resizeMode="cover"
      />

      <Container
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <CardWrapper>
          <CardBody>
            <ZenbaseLogo source={ZenbaseFullLogo} resizeMode="contain" />
          </CardBody>
          <BottomView>
            <Image
              source={ZentbaseVectorWhite}
              style={{ width: 32, height: 32, marginBottom: 10 }}
            />
            <Text numberOfLines={2} adjustsFontSizeToFit fontSize="30" fontWeight="bold">
              Take 3 deep breaths. Loading your experience.
            </Text>
          </BottomView>
        </CardWrapper>
      </Container>
    </Canvas>
  );
}
