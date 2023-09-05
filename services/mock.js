import artist from "mock/artist";
import categories from "mock/categories";
import song from "mock/song";

const mockMap = {
  artist,
  categories,
  category: categories.pop(),
  song,
  songs: [song, song, song, song, song, song],
};

export const useMock = (type, truth, mock) => {
  if (mock === false) return truth;
  return mockMap[type];
};
