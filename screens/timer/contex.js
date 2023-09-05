import { createContext, useContext } from "react";

export const TimerContext = createContext(null);

export function useTimer() {
 
  const providerValues = useContext(TimerContext);

  return { ...providerValues };
}
