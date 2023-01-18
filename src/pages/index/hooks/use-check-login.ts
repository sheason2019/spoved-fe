import { useAtomValue } from "jotai";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { currentUserAtom } from "../../../common/store/current-user";

const useCheckLogin = () => {
  const currentUser = useAtomValue(currentUserAtom);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      // 未登录则前往登录页面
      navigate("/login");
    }
  }, [currentUser]);
};

export default useCheckLogin;
