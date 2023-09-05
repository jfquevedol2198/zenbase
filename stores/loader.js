import Loader from "components/loader";
import React, { createContext, useContext, useState } from "react";

const LoaderContext = createContext();

export const useLoader = () => {
  return useContext(LoaderContext);
};

const renderLoader = () => {
  const { loading } = useLoader();
  if (!loading) return;
  return <Loader />;
};

export const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading, renderLoader }}>
      {children}
    </LoaderContext.Provider>
  );
};
