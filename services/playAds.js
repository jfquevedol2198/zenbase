// import { AdMobInterstitial } from "expo-ads-admob";
import config from "../config";

export const playAds = async (count, onAdPlayed = () => {}, onFinalAdPlayed = () => {}) => {
  // try {
  //   let played = 1;
  //   console.log({ ADMOB: config.GOOGLE_ADMOB_ADUNIT });
  //   await AdMobInterstitial?.setAdUnitID(config.GOOGLE_ADMOB_ADUNIT);
  //   await AdMobInterstitial?.requestAdAsync({ servePersonalizedAds: true });
  //   await AdMobInterstitial?.showAdAsync();

  //   AdMobInterstitial?.addEventListener("interstitialDidClose", async (e) => {
  //     if (count > 1 && played < count) {
  //       await AdMobInterstitial?.requestAdAsync({ servePersonalizedAds: true });
  //       await AdMobInterstitial?.showAdAsync();
  //       onAdPlayed?.(played);
  //       played++;
  //     }
  //   });
  // } catch (e) {
  //   console.error(e);
  // }
};
