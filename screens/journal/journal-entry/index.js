import React, { useState } from "react";
import {
  Alert,
  Container,
  Canvas,
  Text,
  AnimatedHeaderView,
  NavigationPaddingInsetsWithSafeArea,
  Header,
} from "components";
import styled from "styled-components/native";
import { ScrollView, TouchableOpacity } from "react-native";
import { useTheme } from "stores/theme";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

// Import Images
import pinIcon from "assets/icons/pin-outline.png";
import unpinIcon from "assets/icons/unpin-outline.png";

// Styled Component
const HeaderWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  width: 20px;
  height: 20px;
`;

const ButtonWrapper = styled.TouchableOpacity`
  position: absolute;
  width: 100%;
  flex-direction: row;
  top: 0;
  left: 10px;
`;

const JournalType = styled.View`
  margin-top: ${(props) => props.theme.spacing.sm};
  margin-bottom: ${(props) => props.theme.spacing.sm};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FotterFlex = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding-top: 15px;
  padding-left: 20px;
  padding-right: 20px;
`;

const FotterTextWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  padding-right: 25px;
`;

const IconWrapper = styled.View`
  flex-direction: row;
`;

const SongImage = styled.Image`
  width: 37px;
  height: 37px;
  border-radius: 5px;
  margin-right: 20px;
`;

// Delete Journal Component (Default)
export default function JournalEntry({ route, navigation }) {
  // Theme Configuration
  const { theme } = useTheme();
  const { journal, song, journalIndex, togglePin } = route.params;

  const [isPin, setIsPin] = useState(journal?.isPin || false);

  return (
    <>
      <AnimatedHeaderView header={<Header previousScreenName={"Journal"} />} inputRange={[10, 50]}>
        <Canvas>
          <ScrollView
            style={{ width: "100%", paddingBottom: NavigationPaddingInsetsWithSafeArea() }}
            showsVerticalScrollIndicator={false}
          >
            <HeaderWrapper>
              <ButtonWrapper onPress={() => navigation.goBack()}>
                <Ionicons name="ios-chevron-back" size={26} color={theme.color.primary} />
                <Text color="primary" fontSize={16} fontWeight={600} style={{ marginTop: 4 }}>
                  Journal
                </Text>
              </ButtonWrapper>

              <JournalType>
                <Entypo name={`emoji-${journal.type}`} size={36} color={theme.color.white} />
                <Text color="rgba(247, 248, 250, 0.6)" style={{ marginTop: 8 }}>
                  October 20, 2021 at 1:54 PM
                </Text>
              </JournalType>
            </HeaderWrapper>
            <Container style={{ flex: 1 }}>
              <Text fontSize="h2" fontWeight="bold" style={{ marginTop: 8, marginBottom: 18 }}>
                {journal.title}
              </Text>
              <Text>{journal.description}</Text>
            </Container>
          </ScrollView>
        </Canvas>
      </AnimatedHeaderView>
      <BlurView
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          height: NavigationPaddingInsetsWithSafeArea(),
          width: "100%",
          flex: 1,
        }}
        intensity={200}
        tint="dark"
      >
        <FotterFlex>
          <SongImage source={{ uri: song?.artwork }} resizeMode="cover" />
          <FotterTextWrapper>
            <Text numberOfLines={1}>{song?.name}</Text>
          </FotterTextWrapper>
          <IconWrapper>
            <TouchableOpacity>
              <Ionicons
                name="share-outline"
                size={21}
                color={theme.color.primary}
                style={{ marginTop: 5.5, marginRight: 20 }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setIsPin(!isPin);
                togglePin(journalIndex);
              }}
            >
              <Icon
                source={isPin ? unpinIcon : pinIcon}
                resizeMode="contain"
                style={{ marginTop: 9, marginRight: 5 }}
              />
            </TouchableOpacity>
          </IconWrapper>
        </FotterFlex>
      </BlurView>
    </>
  );
}



