import useCurrentUser from "../use-current-user";

// 自动登录Hook
const useAutoLogin = () => {
  const { saveToken } = useCurrentUser();

  const fetchToken = (): string | null => {
    return localStorage.getItem("Authorization");
  };

  const autoLogin = () => {
    const token = fetchToken();
    if (!token) {
      return Promise.resolve(false);
    }

    return saveToken(token, true);
  };

  return {
    autoLogin,
  };
};

export default useAutoLogin;
