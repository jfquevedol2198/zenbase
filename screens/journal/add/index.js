import React, { useEffect, useState, useRef } from "react";
import { Box, Container, Text } from "components";
import styled from "styled-components/native";

import { BlurView } from "expo-blur";
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  TouchableWithoutFeedback,
  View,
  KeyboardAvoidingView,
} from "react-native";
import * as Notifications from "helpers/notifications";

// Import Icons
import { Ionicons, Entypo } from "@expo/vector-icons";

// Import Images
import SongImage from "assets/images/song.png";
import SongImage2 from "assets/images/wallpapers/wallpaper-1.png";
import { useRoute } from "@react-navigation/native";
import { useAuth } from "stores/auth";

// Styled Components
const SongTileWrapper = styled.View`
  position: relative;
  margin-right: ${(props) => props.theme.spacing.md};
  ${(props) => {
    const size = (Dimensions.get("window").width - 40) * 0.5;
    if (size < 185) {
      return `
                width: ${size}px;
                height: ${size}px;
            `;
    }

    return `
            width: 185px;
            height: 185px;
        `;
  }}
`;

const SongTile = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.theme.borderRadius.lg};
`;

const SongTimeWrapper = styled.Text`
  position: absolute;
  top: 10px;
  width: 100%;
  text-align: right;
  color: white;
  padding-right: 10px;
  font-weight: 600;
`;

const EmojiWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 25px;
  margin-bottom: 25px;
`;

const Emoji = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-color: rgba(247, 248, 250, 0.6);
  border-width: 1px;
  border-radius: 100px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterWrapper = styled.View`
  padding-left: ${(props) => props.theme.spacing.xxl};
  padding-right: ${(props) => props.theme.spacing.xxl};
  width: 100%;
  flex: 1;
`;

const FooterBody = styled.View`
  flex: 2;
`;

const FooterButtons = styled.View`
  flex: 0.9;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 42px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: ${(props) => props.theme.borderRadius.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const SkipButton = styled.TouchableOpacity`
  width: 100%;
  height: 42px;
  background-color: rgba(223, 224, 226, 0.35);
  border-radius: ${(props) => props.theme.borderRadius.md};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-width: 0.4px;
  border-color: rgba(247, 248, 250, 0.9);
`;

const JournalText = styled.TouchableOpacity`
  flex: 1;
  margin-top: ${(props) => props.theme.spacing.md};
  margin-bottom: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.4);
`;

const BlurViewHeader = styled.View`
  width: 100%;
  flex-direction: row-reverse;
  align-items: center;
`;

const TextAreaWrapper = styled.View`
  flex: 1;
  margin-top: ${(props) => props.theme.spacing.lg};
  margin-bottom: ${(props) => props.theme.spacing.md};
  margin-left: ${(props) => props.theme.spacing.xxl};
  margin-right: ${(props) => props.theme.spacing.xxl};
  padding: ${(props) => props.theme.spacing.lg};
  border-radius: ${(props) => props.theme.borderRadius.xl};
  background-color: rgba(255, 255, 255, 0.4);
`;

const JournalTitleInput = styled.TextInput`
  color: #f7f8fa;
  font-size: ${(props) => props.theme.fontSize.h2};
  width: 100%;
  font-weight: bold;
`;

const JournalDescriptionInput = styled.TextInput`
  color: #f7f8fa;
  width: 100%;
  flex: 1;
`;

// Add Journal Component (Default)
export default function AddJournal({ navigation }) {
  const journalDescriptionInput = useRef();
  const { song, zentokens, claimToWalletProps, transactTokens } = useRoute().params;
  const claimToWallet = JSON.parse(claimToWalletProps);
  const [emotion, setEmotion] = useState(null);
  const [journalTitle, setJournalTitle] = useState("");
  const [journalDescription, setJournalDescription] = useState("");
  const [zentValue, setZentValue] = useState(zentokens || 0);

  const [isTextInputView, setIsTextInputView] = useState(false);

  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  useEffect(() => {
    if (
      emotion == null
      // ||
      // `${journalTitle}`.trim() == "" ||
      // `${journalDescription}`.trim() == ""
    ) {
      setIsSubmitEnabled(false);
    } else {
      setIsSubmitEnabled(true);
    }
  }, [emotion, journalTitle, journalDescription]);

  useEffect(() => {
    Notifications.askPermissions();
  }, []);

  const { user, updateUser } = useAuth();

  const onSubmit = () => {
    updateUser("journal", [
      {
        title: journalTitle,
        description: journalDescription,
        emotion,
        song: song?._id,
        zentValue,
        created: new Date(),
      },
      ...(user.journal || []),
    ]);
    navigation.navigate("ClaimToWallet", { ...claimToWallet, transactTokens });
    // navigation.goBack();
  };

  return (
    <BlurView intensity={200} tint="dark" style={{ width: "100%", height: "100%" }}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{ marginLeft: 10 }}
        >
          <Ionicons name="ios-chevron-back" size={30} color="blue" />
        </TouchableOpacity> */}
        <View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            style={{ width: "100%", marginTop: 20, marginBottom: 20 }}
            horizontal={true}
          >
            <Box w={`${Dimensions.get("window").width * 0.3}px`} />
            <SongTileWrapper>
              <SongTile source={{ uri: song?.artwork }} />
              {/* <SongTimeWrapper>20 min</SongTimeWrapper> */}
            </SongTileWrapper>
          </ScrollView>
        </View>
        <Container>
          <Text
            fontSize="22"
            fontWeight="600"
            style={{
              marginTop: 5,
              width: "100%",
              textAlign: "center",
              color: "rgba(247,248,250, 0.9)",
            }}
          >
            How are you feeling today?
          </Text>

          <EmojiWrapper>
            <Emoji
              style={[
                { borderWidth: emotion == "happy" ? 1 : 0 },
                emotion == "happy" && {
                  shadowColor: "white",
                  shadowRadius: 8,
                  shadowOpacity: 0.8,
                },
              ]}
              onPress={() => setEmotion("happy")}
            >
              <Entypo name={`emoji-happy`} size={36} color="rgba(254,254,254, 0.9)" />
            </Emoji>

            <Emoji
              style={[
                { borderWidth: emotion == "neutral" ? 1 : 0 },
                emotion == "neutral" && {
                  shadowColor: "white",
                  shadowRadius: 8,
                  shadowOpacity: 0.8,
                },
              ]}
              onPress={() => setEmotion("neutral")}
            >
              <Entypo name={`emoji-neutral`} size={36} color="rgba(254,254,254, 0.9)" />
            </Emoji>

            <Emoji
              style={[
                { borderWidth: emotion == "sad" ? 1 : 0 },
                emotion == "sad" && {
                  shadowColor: "white",
                  shadowRadius: 8,
                  shadowOpacity: 0.8,
                },
              ]}
              onPress={() => setEmotion("sad")}
            >
              <Entypo name={`emoji-sad`} size={36} color="rgba(254,254,254, 0.9)" />
            </Emoji>
          </EmojiWrapper>
        </Container>

        <FooterWrapper>
          <FooterBody>
            <Text fontSize="xl" fontWeight="bold" style={{ marginBottom: 8 }}>
              My Journal
            </Text>
            <JournalText onPress={() => setIsTextInputView(true)}>
              <Text style={{ color: "rgba(247, 248, 250, 0.9)" }} numberOfLines={100}>
                {`${journalDescription}`.trim() || "Write how you’re feeling here..."}
              </Text>
            </JournalText>
            <Text
              fontSize="md"
              style={{
                color: "rgba(255, 255, 255, 0.9)",
                marginTop: 5,
                marginBottom: 18,
              }}
            >
              You can access all of your journal entries from your profile at any time.
            </Text>
          </FooterBody>
          <FooterButtons>
            <SubmitButton
              style={[isSubmitEnabled && { backgroundColor: "#fff" }]}
              onPress={() => {
                if (isSubmitEnabled) {
                  onSubmit();
                }
              }}
            >
              <Text
                fontWeight="600"
                fontSize="lg"
                style={[{ color: isSubmitEnabled ? "#000" : "rgba(0,0,0,0.6)" }]}
              >
                Submit
              </Text>
            </SubmitButton>

            <SkipButton
              onPress={() => {
                navigation.navigate("ClaimToWallet", {
                  ...claimToWallet,
                  transactTokens,
                });
              }}
            >
              <Text fontWeight="600" fontSize="lg">
                Skip check-in
              </Text>
            </SkipButton>
          </FooterButtons>
        </FooterWrapper>
      </SafeAreaView>

      {/* Journal Text Inputs */}
      {isTextInputView && (
        <BlurView
          style={[
            {
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            },
          ]}
          intensity={200}
          tint="dark"
        >
          <KeyboardAvoidingView style={{ width: "100%", height: "100%" }} behavior={"padding"}>
            <SafeAreaView style={{ flex: 1 }}>
              <Container>
                <BlurViewHeader>
                  <TouchableOpacity
                    onPress={() => {
                      setIsTextInputView(false);
                    }}
                  >
                    <Text style={{ marginTop: 5 }}>Done</Text>
                  </TouchableOpacity>
                </BlurViewHeader>
              </Container>
              <TextAreaWrapper>
                <JournalTitleInput
                  returnKeyType="done"
                  autoFocus={true}
                  selectionColor="rgba(255,255,255,0.5)"
                  placeholderTextColor="#F7F8FA"
                  placeholder="Title"
                  onChangeText={setJournalTitle}
                  value={journalTitle}
                  onSubmitEditing={() => {
                    journalDescriptionInput.current.focus();
                  }}
                />

                <JournalDescriptionInput
                  selectionColor="rgba(255,255,255,0.5)"
                  placeholderTextColor="#F7F8FA"
                  placeholder="Write how you’re feeling here..."
                  multiline={true}
                  onChangeText={setJournalDescription}
                  value={journalDescription}
                  ref={journalDescriptionInput}
                />
              </TextAreaWrapper>
              <Container>
                <Text
                  style={{
                    color: "rgba(247, 248, 250, 0.8)",
                    marginTop: 5,
                    marginBottom: 20,
                  }}
                >
                  You can access all of your journal entries from your profile at any time.
                </Text>
              </Container>
            </SafeAreaView>
          </KeyboardAvoidingView>
        </BlurView>
      )}
    </BlurView>
  );
}
