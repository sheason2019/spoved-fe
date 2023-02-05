import useCurrentUser from "../use-current-user";

// 自动登录Hook
const useAutoLogin = () => {
  const { saveToken } = useCurrentUser();

  const fetchToken = (): string | null => {
    // 先尝试从sessionStorage中获取Token
    const token = sessionStorage.getItem("Authorization");
    if (token) {
      return token;
    }

    // 否则尝试从localStorage获取Token
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
