import { TextFieldProps } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountInfo } from "../../../api-lib/account";
import { useAccountClient } from "../../../common/hooks/use-client";
import useCurrentUser from "../../../common/hooks/use-current-user";
import { useDialog } from "../../../common/hooks/use-dialog";
import useAccountFormStatus, {
  AccountFormStatus,
} from "../shared/hooks/use-account-form-status";
import useCrypto from "../shared/hooks/use-crypto";

const useLogin = () => {
  const DialogApi = useDialog();
  const { crypto, encryptString } = useCrypto();
  const { accountClient } = useAccountClient();
  const { status, setStatus } = useAccountFormStatus();
  const { saveToken } = useCurrentUser();

  const navigate = useNavigate();
  const [account, setAccount] = useState<AccountInfo>({
    username: "",
    password: "",
  });
  const [autoLogin, setAutoLogin] = useState(false);

  const handleChange: TextFieldProps["onChange"] = (e) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    if (status !== AccountFormStatus.Inputing) {
      return;
    }

    validate();

    const info: AccountInfo = {
      username: account.username,
      password: encryptString(account.password + crypto!.salt!),
      salt: crypto!.salt,
    };
    setStatus(AccountFormStatus.Posting);
    const [data, err] = await accountClient.Login(info);
    if (err) {
      setStatus(AccountFormStatus.Inputing);
      throw DialogApi.error(err.message);
    }
    const { token } = data;

    const loginSuccess = await saveToken(token!, autoLogin);

    if (loginSuccess) {
      setStatus(AccountFormStatus.Success);
    } else {
      setStatus(AccountFormStatus.Inputing);
      DialogApi.error("获取用户信息失败，请刷新页面重试");
    }
  };

  const validate = (): boolean => {
    if (!account.username || !account.password) {
      throw DialogApi.error("用户名和密码不能为空");
    }

    return true;
  };

  const toRegist = () => {
    navigate("/regist");
  };

  return {
    account,
    setAccount,
    autoLogin,
    setAutoLogin,

    status,

    handleChange,
    handleSubmit,

    toRegist,
  };
};

export default useLogin;
