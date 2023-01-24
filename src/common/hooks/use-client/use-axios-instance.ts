import axios, { CreateAxiosDefaults } from "axios";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";

const axiosConfigAtom = atom<CreateAxiosDefaults<any> | undefined>(undefined);

const useAxiosInstance = () => {
  const [opt, setOpt] = useAtom(axiosConfigAtom);

  const ins = useMemo(() => {
    return axios.create(opt);
  }, [opt]);

  // 设置用户的身份信息
  const setAuthorization = (token: string | null) => {
    if (!token) {
      return setOpt(undefined);
    }
    return setOpt({ headers: { Authorization: token } });
  };

  return { ins, setOpt, setAuthorization };
};

export default useAxiosInstance;
