import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import api from "services/api";

export const DEFAULT_TIME_START = 0;
export const DEFAULT_TIME_END = 9999999;

const camelToSnakeCase = (str) => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const getQueryParameters = (props) => {
  const params = Object.keys(props).reduce((accumulator, current) => {
    return `${accumulator}${camelToSnakeCase(current)}=${props[current]}&`;
  }, "");

  // Remove trailing &
  return params.substring(0, params.length - 1);
};

export const fetchCategory = async (props) => {
  const params = getQueryParameters({ ...props, limit: 16 });
  const url = `legacy/songs/category-name/${props.query}?${params}`;
  const response = await api.get(url);
  return response?.result;
};

export const fetchSection = async (props) => {
  const params = getQueryParameters(props);
  const url = `/songs/section/${props.query}?${params}`;
  const response = await api.get(url);
  console.warn('responseresponse',response)
  return response?.result;
};

export const fetchSearch = async (props) => {
  const params = getQueryParameters({ ...props, limit: 16 });
  const url = `/songs?${params}`;
  const response = await api.get(url);
  return response.result;
};

export const fetchTimer = async (props) => {
  // Time property is in seconds
  const params = getQueryParameters({
    timeStart: (props.query - 3) * 60,
    timeEnd: (props.query + 3) * 60,
    limit: 16,
  });
  const url = `/legacy/songs?${params}`;
  const response = await api.get(url);
  return response.result;
};

export const fetchSongsMap = {
  category: fetchCategory,
  search: fetchSearch,
  section: fetchSection,
  timer: fetchTimer,
};

/**
 * type: search | section | category | timer
 */
export const useSearch = (type, props) => {
  const fetcher = fetchSongsMap[type] || fetchSearch;

  return useQuery({
    queryKey: [
      "search",
      type,
      props.query,
      props.page || 1,
      props.timeStart || DEFAULT_TIME_START,
      props.timeEnd || DEFAULT_TIME_END,
    ],
    queryFn: () => fetcher(props),
  });
};

export const useInfiniteSearch = (type, props) => {
  const fetcher = fetchSongsMap[type] || fetchSearch;

  return useInfiniteQuery({
    queryKey: [
      "infinite-search",
      type,
      props.query,
      props.timeStart || DEFAULT_TIME_START,
      props.timeEnd || DEFAULT_TIME_END,
    ],
    queryFn: ({ pageParam }) => fetcher({ ...props, page: pageParam || 1 }),
    getNextPageParam: (lastPage) => {
      if (lastPage.nextPage) return lastPage.nextPage;
      const page = lastPage?.page;
      const pageCount = lastPage?.pageCount || lastPage?.totalPages || 1;
      if (page < pageCount) return page + 1;
      return undefined;
    },
    getPreviousPageParam: (response) => {
      const pageCount = response?.pageCount || response?.totalPages || 1;
      const page = response?.page;
      if (page < pageCount) return page - 1;
      return undefined;
    },
  });
};
