import { Image } from "react-native";
import config from "services/config";

export const prefetchCategoryArtwork = (category) => {
  Image.prefetch(config.EDGE_IMAGE_PREFIX + category?.artwork);
};

export const prefetchSongArtwork = (song) => {
  Image.prefetch(config.EDGE_IMAGE_PREFIX + song?.artwork);
};
