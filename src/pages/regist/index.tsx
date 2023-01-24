import { FC, useMemo } from "react";
import { Box, Stack, Typography, TextField } from "@mui/material";
import Link from "../../common/components/link";
import AccountFrame from "../login/shared/components/account-frame";
import useRegist from "./hooks/use-regist";
import ErrorText from "../login/shared/components/error-text";
import { LoadingButton } from "@mui/lab";
import { AccountFormStatus } from "../login/shared/hooks/use-account-form-status";

const RegistPage: FC = () => {
  const {
    status,
    errors,
    account,
    handleChange,
    handleSubmit,
    toLogin,
    validateUsername,
    validatePassword,
    validateRepassword,
  } = useRegist();

  const buttonText = useMemo(() => {
    switch (status) {
      case AccountFormStatus.Inputing:
        return "注册";
      case AccountFormStatus.Posting:
        return "正在注册";
      case AccountFormStatus.Success:
        return "注册成功";
    }
  }, []);

  return (
    <AccountFrame title="用户注册" minHeight={280}>
      <Box mt={3} px={3}>
        <Stack spacing={1}>
          <TextField
            size="small"
            placeholder="用户名"
            onChange={handleChange}
            name="username"
            onBlur={validateUsername}
            value={account.username}
            helperText={<ErrorText text={errors.username!} />}
          />
          <TextField
            size="small"
            placeholder="密码"
            type="password"
            onChange={handleChange}
            name="password"
            onBlur={() => {
              validatePassword();
              validateRepassword();
            }}
            value={account.password}
            helperText={<ErrorText text={errors.password!} />}
          />
          <TextField
            size="small"
            placeholder="重复密码"
            type="password"
            onChange={handleChange}
            name="repassword"
            onBlur={validateRepassword}
            value={account.repassword}
            helperText={<ErrorText text={errors.repassword!} />}
          />
        </Stack>
        <LoadingButton
          loading={status === AccountFormStatus.Posting}
          color={status}
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {buttonText}
        </LoadingButton>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "gray", mt: 2 }}
        textAlign="center"
      >
        已有帐户？<Link onClick={toLogin}>直接登录</Link>
      </Typography>
    </AccountFrame>
  );
};

export default RegistPage;
