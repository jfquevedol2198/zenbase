import Purchases from "react-native-purchases";
import { Platform } from "react-native";

const APIKeys = {
  apple: "appl_pCotNTzzUPmehCCKjmANEJjhyEy",
  android: "",
};
const fetchOfferings = async () => {
  let offerings = {};
  try {
    offerings = await Purchases.getOfferings();
  } catch (error) {
    console.log("Fetch offerings error: ", error.message);
  }

  return offerings;
};

const purchasePackage = async (pkg) => {
  try {
    const purchaserInfo = await Purchases.purchasePackage(pkg);
    return purchaserInfo;
  } catch (error) {
    console.log("Purchase Package error: ", error);
  }
};

const configurePurchases = async () => {
  if (Platform.OS === "ios") {
    await Purchases.configure({ apiKey: APIKeys.apple });
  } else {
    await Purchases.configure({ apiKey: APIKeys.android });
  }
};

export default { fetchOfferings, configurePurchases, purchasePackage };
