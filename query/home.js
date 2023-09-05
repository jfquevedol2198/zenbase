import { useQuery } from "@tanstack/react-query";
import api from "services/api";
import { prefetchCategoryArtwork, prefetchSongArtwork } from "./prefetch";

export const useQueryHomepage = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: fetchHomepage,
  });
};

export const fetchHomepage = async () => {
  const response = await api.get("/songs/home");

  response.result?.categories?.map(prefetchCategoryArtwork);
  response.result?.meditation?.map((section) => section?.songs?.map(prefetchSongArtwork));
  response.result?.podcast?.map((section) => section?.songs?.map(prefetchSongArtwork));
  return response.result;
};
