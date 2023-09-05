import { Share } from "react-native";

export default async function ReactNativeShare(message, shared, dismissed, error) {
  try {
    const result = await Share.share({ message });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        shared(result.activityType);
      } else {
        shared(null);
      }
    } else if (result.action === Share.dismissedAction) {
      dismissed();
    }
  } catch (err) {
    error(err);
  }
}
