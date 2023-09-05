import React, { useEffect, useState, useRef, useCallback, useMemo } from "react";
import { Text, Container, Box, SongList, Explorables, NavigationPadding } from "components";
import { Animated, TouchableWithoutFeedback, StatusBar, Dimensions, Platform, KeyboardAvoidingView, ActivityIndicator, Image, View, TouchableOpacity } from "react-native";
import Constants from "expo-constants";
import { useTheme } from "stores/theme";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import { useAuth } from "stores/auth";
import { useFocusEffect } from "@react-navigation/native";
import axios from "services/axios"; BrowseByTime
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "helpers/notifications";
import play from '../../assets/play.png'
// Import Images
import meditationIcon from "assets/icons/meditation.png";
import micIcon from "assets/icons/mic.png";
import ActivelyListing from "components/actively-listening";
import { TopHeader } from "components/layout";
import ZentCoin from "components/ZentCoin";
import ActivitiesTabs from "components/ActivitiesTabs";
import Shortcuts from "./Shortcuts";
import BrowseByTime from "./BrowseByTime";
import Categories from "./Categories";
import InviteFriend from "components/InviteFriend";
import EarnMore from "components/EarnMore";
import { useQueryHomepage } from "query/home";
import { useLoader } from "stores/loader";
import mixpanel from "services/mixpanel";
import Play from "../play";
import Timer from "../timer";
import Actions from "../timer/actions";
import AmbientSound from "../timer/ambientSound";
import AmbientSoundSelection from "../timer/ambientSoundSelection";
import Counter from "../timer/counter";
import IntervalBell from "../timer/intervalBell";
import TimerBellList from "../timer/timerBellList";
import BellCard from "../timer/timerBellList/bellCard";
import BellIconCard from "../timer/timerBellList/bellIconCard";
import TimerEarned from "../timer/timerEarned";
import TimeSelection from "../timer/timeSelection";

const windowHeight = Dimensions.get("window").height;

const PremiumTextWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-end;
`;

const BlurHeaderWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: ${Constants.statusBarHeight}px;
`;

const ListWrapper = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: flex-start;
`;

const ListContentWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-left: ${(props) => props.theme.spacing.lg};
`;

const VAlignCenter = styled.View`
  padding-top: ${(props) => props.theme.spacing.md};
  padding-bottom: ${(props) => props.theme.spacing.sm};
  flex-direction: column;
  justify-content: center;
`;

const ZentImage = styled.Image`
  height: 30px;
  width: 51px;
  border-radius: 2px;
`;

export default function Home({ navigation, route }) {
  const { user, fetchTransactions, updateUser } = useAuth();
  const scrollY = useRef(new Animated.Value(0)).current;

  const { theme } = useTheme();

  const [isFirstTimeModel, setIsFirstTimeModal] = useState(true);

  const notificationListener = useRef();
  const responseListener = useRef();

  const { data, isLoading } = useQueryHomepage();
  // console.log("m data", data);



  // useEffect(() => {
  //   setLoading(isLoading);
  // }, [isLoading]);

  // useEffect(() => {
  //   !isLoading && mixpanel.screen("Home", data);
  // }, [data, isLoading]);

  // useEffect(() => {
  //   playAds();
  // }, []);

  useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
     
    });

    (async () => {
      try {
        if ((await AsyncStorage.getItem("isFirstTimeModal")) == "0") {
          return setIsFirstTimeModal(false);
        }
      } catch (e) {
        console.log(e);
      }
    })();

    (async () => {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync();
        await Notifications.scheduleNotification(
          {
            title: `Don't Forget to Earn Zentokens!`,
            body: "Take time to clear your mind. Come back to keep earning Zentokens!",
          },
          { seconds: 2 * 60 * 60 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Crazy Day? Meditate for 5 minutes`,
            body: `With a clear head you'll better able to manage your day.`,
          },
          { seconds: 8 * 60 * 60 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Need Something Chill?`,
            body: "Listen to chill vibes while taking time for yourself.",
          },
          { seconds: 5 * 60 * 60 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Relax Before Bedtime`,
            body: `Take time tonight to clear your mind and catch good zzz's.`,
          },
          { repeats: true, hour: 21, minute: 15 }
        );
        await Notifications.scheduleNotification(
          {
            title: `Start Your Morning Right`,
            body: `Take some time to express gratitude and feel grateful throughout the day.`,
          },
          { repeats: true, hour: 6, minute: 30 }
        );
      } catch (e) {
        console.log(e);
      }
    })();

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchTransactions();
      verifyZenbasePremium();

      return () => {
        removeFirstTimeModal();
      };
    }, [])
  );

  const [loading, setLoading] = useState(true);



  const removeFirstTimeModal = async () => {
    try {
      setIsFirstTimeModal(false);
      await AsyncStorage.setItem("isFirstTimeModal", "0");
    } catch (e) {
      console.log(e);
    }
  };

  const verifyZenbasePremium = async () => {
    try {
      const response = await axios.get("/subscriptions");
      if (user.isPremium == true && response.data.data.isPremium == false) {
        // User premium has ended
      }
      updateUser("isPremium", response.data.data.isPremium);
      updateUserLocal("hours", response.data.data.hours);
    } catch (e) {
      axios.handleError(e);
    }
  };
  const meditateFriendData = data?.meditation?.find(
    (section) => section.title === "Meditate With Friends"
  );

  const tabContent = [
    {
      id: "MEDITATION",
      name: "MEDITATION",
      icon: { source: meditationIcon, width: "18px" },
      component: (
        <>
          <View style={{ marginBottom: '-10%' }}>
            <Categories isMeditation categories={data?.categories?.filter((cat) => !cat.isPodcast)} />
          </View>
          <View style={{}}>
            <BrowseByTime />
          </View>

          {data?.meditation
            ?.filter(
              (section) =>
                section.title !== "All Meditations" && section.title !== "Meditate With Friends"
            )
            ?.map((section) =>
              section.songs.length > 0 ? (
                <SongList
                  categories={data?.categories?.filter((cat) => !cat.isPodcast)}
                  id={section?.id}
                  title={section.title}
                  songs={section.songs}
                  onSongPlay={(title) => setCurrentSongTitle(title)}
                  onSongPress={(songId) => navigation.navigate('Play', { songId })}
               
                />
              ) : (
                <></>
              )
            )}
          <Container>
            <InviteFriend
              label="Meditate"
              onPress={() => {
                const props = {
                  type: "category",
                  id: meditateFriendData?.id,
                  title: meditateFriendData?.title,
                };

                mixpanel.track("Select Item List", props);
                navigation.navigate("SongList", props);
              }}
            />

            <EarnMore />
          </Container>
          <SongList
            categories={data?.categories?.filter((cat) => !cat.isPodcast)}
            id={meditateFriendData?.id || ""}
            songs={meditateFriendData?.songs || []}
          />
          <SongList
            categories={data?.categories?.filter((cat) => !cat.isPodcast)}
            title="All Meditations"
            id={data?.meditation?.find((section) => section.title === "All Meditations")?.id || ""}
            songs={
              data?.meditation?.find((section) => section.title === "All Meditations")?.songs || []
            }
          />
        </>
      ),
    },
    {
      id: "PODCASTS",
      name: "PODCAST",
      icon: { source: micIcon, width: "10.87px" },
      component: (
        <>
          <Categories categories={data?.categories?.filter((cat) => cat.isPodcast)} />
          <Container>
            <InviteFriend label="Listen" />
            <EarnMore />
          </Container>
          {data?.podcast
            ?.filter((section) => section.title !== "All Meditations")
            ?.map((section) => {
         
              section.songs.length > 0 ? (
                <SongList
                  categories={data?.categories?.filter((cat) => cat.isPodcast)}
                  id={section?.id}
                  title={section.title}
                  songs={section.songs}
               
                />
              ) : (
                <></>
              )
            })}
        </>
      ),
    },
  ];

  const activelyListeningCount = useMemo(() => {
    return data?.peopleListening;
  }, []);
   
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Animated.ScrollView
        style={{ backgroundColor: theme.color.background }}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
          useNativeDriver: true,
        })}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        scrollEnabled={!isFirstTimeModel}
      >
          
        <Container>
          <Box mt={`${Platform.OS == "ios" ? Constants.statusBarHeight : 10}px`} />
          <ActivelyListing count={activelyListeningCount} />
        
          
          <View style={{ marginTop: "85%", flexDirection: 'row', alignItems: "center", width: '100%', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: "center", width: '60%' }}>

              <TouchableOpacity onPress={() => {


                navigation.navigate('Play', { _id:'64a427c0d2d7e154414277c5' });
           
            }}>
              <TopHeader title="Start Here" />
              </TouchableOpacity>

              <View style={{ backgroundColor: 'gray', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, alignItems: "center", marginLeft: '9%' }}>
                <Text style={{ textAlign: 'center' }}>15 min</Text>
              </View>
            </View>

            <TouchableOpacity onPress={() => {


                navigation.navigate('Play', { _id:'64a427c0d2d7e154414277c5' });
           
            }}>
              <Image style={{ resizeMode: 'contain', height: 30, width: 30 }} source={play} />
            </TouchableOpacity>

             
       

          </View >


        </Container>


        <Explorables />

        <Container>
          <ZentCoin />
        </Container>
        {/* <Shortcuts /> */}
        <ActivitiesTabs title="Wellness Tools" tabContent={tabContent} />

        <NavigationPadding padding={50} />
      </Animated.ScrollView>
      <Animated.View
        style={{
          position: "absolute",
          width: "100%",
          top: 0,
          left: 0,
          zIndex: scrollY.interpolate({
            inputRange: [20, 50],
            outputRange: [-1, 1],
          }),
          opacity: scrollY.interpolate({
            inputRange: [20, 50],
            outputRange: [0, 1],
          }),
        }}
      >
        {Platform.OS == "ios" && (
          <BlurView
            intensity={150}
            style={{
              width: "100%",
              height: (Platform.OS == "ios" ? Constants.statusBarHeight : 15) + 30,
              paddingBottom: Platform.OS == "android" ? 10 : 0,
            }}
            tint="dark"
          >
            <BlurHeaderWrapper>
              <Text style={{ marginBottom: 15 }}>Explore</Text>
            </BlurHeaderWrapper>
          </BlurView>
        )}
      </Animated.View>

      {isFirstTimeModel && (
        <TouchableWithoutFeedback onPress={removeFirstTimeModal}>
          <BlurView
            intensity={150}
            style={{
              position: "absolute",
              width: "100%",
              height:
                windowHeight - (Platform.OS == "ios" ? Constants.statusBarHeight : 15) - 310 - 30,
              bottom: 0,
              left: 0,
              zIndex: 99999,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
            tint="dark"
          >
            <AntDesign name="arrowup" size={50} color="white" style={{ marginTop: 20 }} />
            <Text style={{ marginTop: 25, textAlign: "center" }} fontSize={22} fontWeight={600}>
              Welcome!
            </Text>
            <Text style={{ marginTop: 10, textAlign: "center" }} fontSize={22} fontWeight={600}>
              If you’re new to meditation, we recommend you start here.
            </Text>
            <Text style={{ marginTop: "30%", textAlign: "center" }} fontSize={14}>
              No thanks, I know how to meditate
            </Text>
          </BlurView>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

