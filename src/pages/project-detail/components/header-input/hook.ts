import { useState } from "react";
import { HeaderPair } from "./types";

export const useHeaderInput = () => {
  const [headerPairs, setHeaderPairs] = useState<HeaderPair[]>([]);

  return {
    headerPairs,
    setHeaderPairs,
  };
};

export default useHeaderInput;
