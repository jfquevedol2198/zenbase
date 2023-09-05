import * as Device from "expo-device";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const init = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  });
};

export const askPermissions = async () => {
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      // alert('Enable push notifications to use the app!');
      await AsyncStorage.setItem("expopushtoken", "");
      return;
    }
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    await AsyncStorage.setItem("expopushtoken", token);
  } else {
    // alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
};

export const scheduleNotification = async (content, trigger) => {
  return Notifications.scheduleNotificationAsync({
    content,
    trigger,
  });
};

export const addNotificationReceivedListener = (cb) => {
  return Notifications.addNotificationReceivedListener(cb);
};

export const addNotificationResponseReceivedListener = (cb) => {
  return Notifications.addNotificationResponseReceivedListener(cb);
};

export const removeNotificationSubscription = (ref) => {
  Notifications.removeNotificationSubscription(ref);
};

export const cancelAllScheduledNotificationsAsync = () => {
  return Notifications.cancelAllScheduledNotificationsAsync();
};
