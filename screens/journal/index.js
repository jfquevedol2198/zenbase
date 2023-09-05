import React, { useState } from "react";
import {
  Container,
  Canvas,
  Text,
  Header,
  AnimatedHeaderView,
  NavigationPaddingInsetsWithSafeArea,
} from "components";
import { ScrollView, TouchableHighlight, TouchableOpacity, View, Modal } from "react-native";
import { useTheme } from "stores/theme";
import { SwipeListView } from "react-native-swipe-list-view";
import styled from "styled-components/native";
import { useAuth } from "stores/auth";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import axios from "services/axios";

// Import Images
import SongImage from "assets/images/song.png";
import ZenbaseVectorGrey from "assets/vectors/zenbase-dark-grey.png";
import pinIcon from "assets/icons/pin.png";
import unpinIcon from "assets/icons/unpin.png";

// Import Icons
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import DeleteJournal from "./delete";

const SearchInput = styled.TextInput`
  color: white;
  width: 100%;
  border-radius: 10px;
  padding-left: 5px;
  padding-right: 15px;
  height: 30px;
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: ${(props) => props.theme.fontSize.md};
`;
const SearchBarContainer = styled.View`
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const SearchBarWrapper = styled.View`
  flex: 1;
  height: 32px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background-color: ${(props) => props.theme.color.hud};
  padding-left: 8px;
  padding-right: 8px;
  margin-bottom: 20px;
`;
const JournalList = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
  padding-top: 8px;
  padding-bottom: 10px;
  padding-left: 12px;
  padding-right: 20px;
  background-color: ${(props) => props.theme.color.background};
`;

const JournalListContent = styled.View`
  height: 89px;
  flex: 1;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-left: 8px;
  padding-bottom: 5px;
`;

const JournalListImg = styled.Image`
  width: 90px;
  height: 89px;
  border-radius: 10px;
  margin-left: 8px;
  margin-right: 8px;
`;

const JournalListImgLoading = styled.View`
  width: 90px;
  height: 89px;
  border-radius: 10px;
  margin-left: 8px;
  margin-right: 8px;
  background: ${(props) => props.theme.color.hud};
`;

const JournalDeleteWrapper = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 8px;
  padding-bottom: 10px;
`;

const JournalPinButton = styled.TouchableOpacity`
  width: 89px;
  height: 89px;
  background-color: ${(props) => props.theme.color.primary};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  border-radius: 10px;
`;

const PinImage = styled.Image`
  width: 16px;
  height: 16px;
`;

const JournalDeleteButton = styled.TouchableOpacity`
  width: 89px;
  background-color: red;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  border-radius: 10px;
`;

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Group Array
const groupBy = (array, key) => {
  return array.reduce((acc, obj) => {
    const property = obj[key];
    acc[property] = acc[property] || [];
    acc[property].push(obj);
    return acc;
  }, {});
};

// Journal Component (Default)
export default function Journal({ route, navigation }) {
  // Theme Configuration
  const isFocused = useIsFocused();

  const { theme } = useTheme();
  const { user, updateUser } = useAuth();

  const [search, setSearch] = useState("");
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const [deleteJournalIndex, setDeleteJournalIndex] = useState(null);

  const createJournalList = () => {
    return user.journal.map((item, index) => {
      const createdAt = new Date(item.created);
      return {
        //id: 1,
        index,
        title: item.title,
        date: `${months[createdAt.getMonth()]} ${createdAt.getDate()}`,
        group: item.isPin ? "Pinned" : `${months[createdAt.getMonth()]} ${createdAt.getFullYear()}`,
        description: item.description,
        type: item.emotion,
        zentValue: item.zentValue,
        isPin: item.isPin,
        item,
      };
    });
  };

  const [journals, setJournals] = useState(createJournalList());

  const [groupedJournals, setGroupedJournal] = useState(groupBy(journals, "group"));

  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const updatedSongIds = journals.map((entry) => {
      return entry.item.song;
    });
    if (updatedSongIds.length > 0) {
      fetchSongs(updatedSongIds);
    }

    setGroupedJournal(groupBy(journals, "group"));
  }, [journals]);

  useEffect(() => {
    const text = `${search}`.trim();
    if (text) {
      let result = journals.filter((item) => {
        return new RegExp(text, "gi").test(item.title);
      });

      setGroupedJournal(groupBy(result, "group"));
    } else {
      setGroupedJournal(groupBy(journals, "group"));
    }
  }, [search]);

  const fetchSongs = async (ids) => {
    const response = await axios.get("/songs/ids?ids=" + ids.join(","));
    setSongs(response.data.data.results);
  };

  // Function to delete Journal
  const deleteJournal = () => {
    // Delete Logic...
    if (deleteJournalIndex != null) {
      user.journal.splice(deleteJournalIndex, 1);
      setJournals(createJournalList());

      updateUser("journal", [...user.journal]);
    }

    setDeleteJournalIndex(null);
    setDeleteModalVisible(false);
  };

  const togglePin = (journalIndex) => {
    user.journal[journalIndex].isPin = !user.journal[journalIndex]?.isPin;
    setJournals(createJournalList());

    updateUser("journal", [...user.journal]);
  };

  return (
    <>
      <Modal animationType="fade" transparent={true} visible={deleteModalVisible}>
        <DeleteJournal
          onDelete={deleteJournal}
          onClose={() => {
            setDeleteModalVisible(false);
          }}
        />
      </Modal>
      <AnimatedHeaderView header={<Header previousScreenName={"Profile"} />} inputRange={[10, 50]}>
        <Canvas>
          <ScrollView
            style={{ width: "100%", paddingBottom: NavigationPaddingInsetsWithSafeArea() + 30 }}
            showsVerticalScrollIndicator={false}
          >
            <Header previousScreenName={"Profile"} />
            <Container>
              <Text fontSize="32" fontWeight="bold" style={{ marginBottom: 18 }}>
                My Journal
              </Text>
              {/* <Ionicons name="ios-chevron-forward" size={20} color={theme.color.information} /> */}
              {!user.isPremium ? (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("UpgradePremium", { previousScreenName: "My Journal" });
                  }}
                  style={{
                    width: "100%",
                    marginBottom: 20,
                    marginTop: 5,
                  }}
                >
                  <JournalList
                    style={{
                      paddingTop: 3,
                      borderRadius: 10,
                      backgroundColor: theme.color.hud,
                      height: 64,
                    }}
                  >
                    <JournalListContent style={{ height: 64 }}>
                      <JournalListImg
                        source={ZenbaseVectorGrey}
                        style={{
                          width: 35,
                          height: 35,
                          marginLeft: 0,
                          marginRight: 15,
                          borderRadius: 0,
                        }}
                        resizeMode="contain"
                      />
                      <View style={{ width: "79%" }}>
                        <Text
                          numberOfLines={2}
                          adjustsFontSizeToFit
                          style={{ lineHeight: 18 }}
                          fontSize="13"
                        >
                          Save all of your journal entries with Zenbase Premium and earn more.
                        </Text>
                      </View>
                      <View
                        style={{
                          width: "5%",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Ionicons
                          name="ios-chevron-forward"
                          size={20}
                          color={theme.color.information}
                        />
                      </View>
                    </JournalListContent>
                  </JournalList>
                </TouchableOpacity>
              ) : (
                <SearchBarContainer>
                  <SearchBarWrapper>
                    <Ionicons name="search" size={20} color="rgba(143, 144, 148, 1)" />
                    <SearchInput
                      returnKeyType="done"
                      selectionColor={theme.color.white}
                      placeholder="Search"
                      placeholderTextColor="rgba(143, 144, 148, 1)"
                      value={search}
                      onChangeText={(value) => setSearch(value)}
                    />
                  </SearchBarWrapper>
                </SearchBarContainer>
              )}
            </Container>

            {journals.length > 0 &&
              (groupedJournals["Pinned"]
                ? [...new Set(["Pinned", ...Object.keys(groupedJournals)])]
                : Object.keys(groupedJournals)
              ).map((key) => {
                return (
                  <>
                    <Container>
                      <Text fontSize="24" fontWeight="bold" style={{ marginBottom: 8 }}>
                        {key}
                      </Text>
                    </Container>
                    <SwipeListView
                      closeOnRowOpen={true}
                      data={groupedJournals[key]}
                      renderItem={(data, rowMap) => {
                        const song = songs.find((x) => {
                          return x._id == data.item.item.song;
                        });

                        return (
                          <TouchableHighlight
                            onPress={() => {
                              navigation.navigate("JournalEntry", {
                                journal: data.item,
                                journalIndex: data.item.index,
                                togglePin,
                                song,
                              });
                            }}
                            style={{ marginBottom: 2 }}
                          >
                            <JournalList>
                              {song ? (
                                <JournalListImg
                                  source={{ uri: song?.artwork }}
                                  resizeMode="cover"
                                />
                              ) : (
                                <JournalListImgLoading />
                              )}
                              <JournalListContent
                                style={
                                  data.index == journals.length - 1
                                    ? { borderBottomWidth: 0 }
                                    : null
                                }
                              >
                                <View style={{ width: "100%" }}>
                                  <Text numberOfLines={1} color="primary" fontWeight="600">
                                    {data.item.date} •{" "}
                                    {Number(data.item.zentValue).toFixed(3) || "0"} ZENT
                                  </Text>
                                  <Text
                                    numberOfLines={1}
                                    style={{
                                      marginTop: 8,
                                      textTransform: "capitalize",
                                    }}
                                    fontSize="16"
                                    fontWeight="500"
                                  >
                                    {data.item.title || data.item.type}
                                  </Text>
                                  <Text color="description" numberOfLines={1} fontSize="16">
                                    {data.item.description}
                                  </Text>
                                </View>
                              </JournalListContent>
                            </JournalList>
                          </TouchableHighlight>
                        );
                      }}
                      renderHiddenItem={(data, rowMap) => {
                        return (
                          <JournalDeleteWrapper>
                            <JournalPinButton
                              onPress={() => {
                                setSearch("");
                                rowMap[data.index].closeRow();
                                togglePin(data.item.index);
                              }}
                            >
                              <PinImage
                                source={data.item.isPin ? unpinIcon : pinIcon}
                                resizeMode="contain"
                              />
                            </JournalPinButton>
                            <JournalDeleteButton
                              onPress={() => {
                                rowMap[data.index].closeRow();
                                setDeleteJournalIndex(data.item.index);
                                setDeleteModalVisible(true);
                              }}
                            >
                              <Ionicons name="trash" size={24} color={theme.color.white} />
                            </JournalDeleteButton>
                          </JournalDeleteWrapper>
                        );
                      }}
                      keyExtractor={(data, index) => {
                        return `${index}`;
                      }}
                      leftOpenValue={109}
                      stopLeftwipe={120}
                      rightOpenValue={-109}
                      stopRightSwipe={-120}
                      style={{ marginBottom: 18 }}
                    />
                  </>
                );
              })}
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
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          paddingTop: 20,
        }}
        intensity={200}
        tint="dark"
      >
        <Text>
          {journals.length} Journal {journals.length > 1 ? "Entries" : "Entry"}
        </Text>
      </BlurView>
    </>
  );
}
