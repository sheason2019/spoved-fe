import { TextFieldProps } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AccountInfo } from "../../../api-lib/account";
import { useAccountClient } from "../../../common/hooks/use-client";
import { useDialog } from "../../../common/hooks/use-dialog";
import useAccountFormStatus, {
  AccountFormStatus,
} from "../../login/shared/hooks/use-account-form-status";
import useCrypto from "../../login/shared/hooks/use-crypto";

interface RegistInfo extends AccountInfo {
  repassword: string;
}

const useRegist = () => {
  const { status, setStatus } = useAccountFormStatus();
  const { crypto, encryptString } = useCrypto();
  const DialogApi = useDialog();
  const navigate = useNavigate();
  const [account, setAccount] = useState<RegistInfo>({
    username: "",
    password: "",
    repassword: "",
  });
  const [errors, setErrors] = useState<RegistInfo>({
    username: "",
    password: "",
    repassword: "",
  });
  const { accountClient } = useAccountClient();

  const setError = (field: string, msg: string) => {
    setErrors((errors) => ({ ...errors, [field]: msg }));
    return msg;
  };

  const handleChange: TextFieldProps["onChange"] = (e) => {
    setError(e.target.name, "");
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const toLogin = () => {
    navigate("/login");
  };

  const handleSubmit = async () => {
    if (status !== AccountFormStatus.Inputing) {
      return;
    }

    // 校验
    const check = await validate();
    if (!check) {
      return;
    }

    // 将Password转换成密文
    const payload: AccountInfo = {
      username: account.username,
      password: encryptString(account.password + crypto!.salt!),
      salt: crypto!.salt,
    };
    setStatus(AccountFormStatus.Posting);
    // 发送注册请求
    const [_, err] = await accountClient.Regist(payload);
    if (err) {
      setStatus(AccountFormStatus.Inputing);
      throw DialogApi.error(err.message);
    } else {
      setStatus(AccountFormStatus.Success);
      return DialogApi.success({
        title: "注册成功",
        content: "点击确认按钮跳转到登录页面",
        onOk() {
          navigate("/login");
          return true;
        },
        clickAwayToCancel: false,
      });
    }
  };

  // 验证
  const validate = async (): Promise<boolean> => {
    const usernameErr = await validateUsername();
    const passwordErr = validatePassword();
    const repasswordErr = validateRepassword();

    return !(usernameErr || passwordErr || repasswordErr);
  };

  const validateUsername = async (): Promise<string | null> => {
    const [data, err] = await accountClient.GetUsernameRepeat({
      name: account.username,
    });
    if (err) {
      // 网络请求发生错误
      throw DialogApi.error(err.message);
    } else if (data.repeat) {
      return setError("username", "用户名已被占用");
    }

    let useKeyword = false;
    ["login", "regist", "profile", "service"].forEach((keyword) => {
      if (account.username === keyword) {
        useKeyword = true;
      }
    });
    if (useKeyword) {
      return setError("username", "禁用的用户名称");
    }

    const reg = /^[\w\-_]{1,24}$/;
    if (!reg.test(account.username!)) {
      return setError(
        "username",
        "只能使用1-24位的字母、数字、下划线以及-符号组成用户名"
      );
    }

    return setError("username", "");
  };

  const validatePassword = (): string | null => {
    // 密码长度必须在4-48位之间
    const length = account.password!.length;
    if (length < 4 || length > 48) {
      return setError("password", "密码长度必须在4-48位之间");
    }
    return setError("password", "");
  };

  const validateRepassword = (): string | null => {
    // 重复密码内容必须和密码内容相同
    if (account.password !== account.repassword) {
      return setError("repassword", "两次输入的密码内容必须完全相同");
    }
    return setError("repassword", "");
  };

  return {
    account,
    setAccount,
    errors,

    status,

    validateUsername,
    validatePassword,
    validateRepassword,

    handleChange,
    handleSubmit,
    toLogin,
  };
};

export default useRegist;
