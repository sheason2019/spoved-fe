import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountInfo } from "../../../api-lib/account";

interface RegistInfo extends AccountInfo {
  repassword: string;
}

const useRegist = () => {
  const navigate = useNavigate();
  const [account, setAccount] = useState<RegistInfo>({
    username: "",
    password: "",
    repassword: "",
  });

  const toLogin = () => {
    navigate("/login");
  };

  return {
    account,
    setAccount,

    toLogin,
  };
};

export default useRegist;
