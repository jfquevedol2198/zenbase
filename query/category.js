import { useQuery } from "@tanstack/react-query";
import api from "services/api";
import { prefetchCategoryArtwork } from "./prefetch";
export const useQueryCategory = () => {
  return useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
};
export const fetchCategory = async () => {
  const response = await api.get("/songs/home");
  response.result?.categories?.map(prefetchCategoryArtwork);
  return response.result;
};
