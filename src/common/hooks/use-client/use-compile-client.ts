import { useMemo } from "react";
import { CompileApiClient } from "../../../api-lib/compile";

import { createClientProxy } from "../../utils/client-factory";
import useAxiosInstance from "./use-axios-instance";

export const useCompileDialog = () => {
  const { ins } = useAxiosInstance();

  const client = useMemo(() => {
    const accountClient = new CompileApiClient({
      host: "/api",
      ins,
    });

    // 通过Proxy对返回值和错误进行拆包和再组装
    return createClientProxy(accountClient);
  }, [ins]);

  return { client };
};

export default useCompileDialog;
