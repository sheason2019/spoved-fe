import { useAtomValue } from "jotai";
import useAutoLogin from "../../../../common/hooks/hooks/use-auto-login";
import { currentUserAtom } from "../../../../common/store/current-user";

const useCheckLogin = () => {
  const { autoLogin } = useAutoLogin();
  const currentUser = useAtomValue(currentUserAtom);

  const checkLogin = async () => {
    // 如果用户信息已存在于内存，则不执行Guard逻辑
    if (currentUser) {
      return true;
    }

    const login = await autoLogin();
    return login;
  };

  return { checkLogin, currentUser };
};

export default useCheckLogin;
