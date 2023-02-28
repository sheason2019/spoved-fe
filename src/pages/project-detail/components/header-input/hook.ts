import { useState } from "react";
import { EnvPair } from "./types";

export const useEnvInput = () => {
  const [envPairs, setEnvPairs] = useState<EnvPair[]>([]);

  return {
    envPairs,
    setEnvPairs,
  }
};

export default useEnvInput;
