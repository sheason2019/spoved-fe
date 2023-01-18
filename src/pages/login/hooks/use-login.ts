import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountInfo } from "../../../api-lib/account";

const useLogin = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountInfo>({
    username: "",
    password: "",
  });

  const toRegist = () => {
    navigate("/regist");
  };

  return {
    account,
    setAccount,

    toRegist,
  };
};

export default useLogin;
