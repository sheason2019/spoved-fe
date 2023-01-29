import axios, { CreateAxiosDefaults } from "axios";
import { useMemo } from "react";
import { AccountApiClient } from "../../../api-lib/account";
import { createClientProxy } from "../../utils/client-factory";
import useAxiosInstance from "./use-axios-instance";

export const useAccountClient = () => {
  const { ins } = useAxiosInstance();

  const client = useMemo(() => {
    const accountClient = new AccountApiClient({
      host: "/api",
      ins,
    });

    // 通过Proxy对返回值和错误进行拆包和再组装
    return createClientProxy(accountClient);
  }, [ins]);

  const clientWithOption = (opt: CreateAxiosDefaults) => {
    const ins = axios.create(opt);
    const client = new AccountApiClient({
      host: "/api",
      ins,
    });

    return createClientProxy(client);
  };

  return { accountClient: client, clientWithOption };
};

export default useAccountClient;
