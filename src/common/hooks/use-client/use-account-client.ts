import { AccountServiceClient } from "../../../api-lib/account";
import { createClientProxy } from "../../utils/client-factory";

const accountClient = new AccountServiceClient({
  host: "/api",
});

// 构建一个工厂函数，使用proxy代理
const accountProxy = createClientProxy(accountClient);

export const useAccountClient = () => {
  const setAuthorization = (token: string) => {};

  return { accountClient: accountProxy, setAuthorization };
};

export default useAccountClient;
