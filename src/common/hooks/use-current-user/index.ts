import { useAtom } from "jotai";
import { currentUserAtom } from "../../../common/store/current-user";
import { useAccountClient } from "../use-client";
import useAxiosInstance from "../use-client/use-axios-instance";

const useCurrentUser = () => {
  const { clientWithOption } = useAccountClient();
  const { setAuthorization } = useAxiosInstance();

  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  // 保存当前用户信息
  const saveToken = async (token: string, useStorage: boolean) => {
    // 测试当前使用的Token是否有效
    const loginSuccess = await fetchUserByToken(token);
    // 当无法获取Token时不执行后面的逻辑
    if (!loginSuccess) {
      return false;
    }

    // 将Token保存到内存中
    setAuthorization(token);

    // 若指定七日内自动登录，则将Token保存到Storage
    localStorage.removeItem("Authorization");
    if (useStorage) {
      localStorage.setItem("Authorization", token);
    }

    return loginSuccess;
  };

  // 根据Token拉取用户信息
  const fetchUserByToken = async (token: string): Promise<boolean> => {
    const client = clientWithOption({ headers: { Authorization: token } });

    const [data, err] = await client.GetCurrentUser();
    if (err) {
      console.error("登录失败", err);
      return false;
    }
    setCurrentUser({ username: data.username! });
    return true;
  };

  return {
    user: currentUser,

    saveToken,
  };
};

export default useCurrentUser;
