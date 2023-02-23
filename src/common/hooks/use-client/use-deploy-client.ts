import { useMemo } from "react";
import { DeployApiClient } from "../../../api-lib/deploy";

import { createClientProxy } from "../../utils/client-factory";
import useAxiosInstance from "./use-axios-instance";

export const useDeployClient = () => {
  const { ins } = useAxiosInstance();

  const client = useMemo(() => {
    const deployClient = new DeployApiClient({
      host: "/api",
      ins,
    });

    // 通过Proxy对返回值和错误进行拆包和再组装
    return createClientProxy(deployClient);
  }, [ins]);

  return { client };
};

export default useDeployClient;
