import { useMemo } from "react";
import { ProjectApiClient } from "../../../api-lib/project";

import { createClientProxy } from "../../utils/client-factory";
import useAxiosInstance from "./use-axios-instance";

export const useProjectClient = () => {
  const { ins } = useAxiosInstance();

  const client = useMemo(() => {
    const accountClient = new ProjectApiClient({
      host: "/api",
      ins,
    });

    // 通过Proxy对返回值和错误进行拆包和再组装
    return createClientProxy(accountClient);
  }, [ins]);

  return { projectClient: client };
};

export default useProjectClient;
