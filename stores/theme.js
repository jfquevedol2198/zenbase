import React, { createContext, useContext, useState } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import themes from "themes";
import { Dimensions } from "react-native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes["dark"]);
  const [themeKey, setThemeKey] = useState("dark");

  const setLightTheme = () => {
    setTheme(themes["light"]);
    setThemeKey("light");
  };
  const setDarkTheme = () => {
    setTheme(themes["dark"]);
    setThemeKey("dark");
  };

  const toggleTheme = (switchTheme = null) => {
    if (switchTheme !== null) {
      setTheme(themes[switchTheme]);
    } else {
      if (themeKey === "dark") {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    }
  };

  const windowWidth = Dimensions.get("window").width;

  function getSize(size, screenWidth = 414) {
    const sizeReduce = windowWidth / screenWidth;
    return windowWidth < screenWidth ? size * sizeReduce : size;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, themeKey }}>
      <StyledThemeProvider theme={{ ...theme, getSize }}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const useSize = (props = {}) => {
  const { screenWidth = 414 } = props;
  const windowWidth = Dimensions.get("window").width;

  function getSize(size) {
    const sizeReduce = windowWidth / screenWidth;
    return windowWidth < screenWidth ? size * sizeReduce : size;
  }

  return { getSize };
};
