import { FC, useMemo } from "react";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Link from "../../common/components/link";
import useLogin from "./hooks/use-login";
import AccountFrame from "./shared/components/account-frame";
import { AccountFormStatus } from "./shared/hooks/use-account-form-status";

const LoginPage: FC = () => {
  const {
    account,
    status,
    autoLogin,
    setAutoLogin,
    handleChange,
    handleSubmit,
    toRegist,
  } = useLogin();

  const buttonText = useMemo(() => {
    switch (status) {
      case AccountFormStatus.Inputing:
        return "登录";
      case AccountFormStatus.Posting:
        return "正在登录";
      case AccountFormStatus.Success:
        return "登录成功";
    }
  }, [status]);

  return (
    <AccountFrame title="用户登录" minHeight={280}>
      <Box mt={3} px={3} component="form" onSubmit={handleSubmit}>
        <Stack spacing={1} sx={{ flex: 1 }}>
          <TextField
            size="small"
            placeholder="用户名"
            value={account.username}
            name="username"
            onChange={handleChange}
          />
          <TextField
            size="small"
            placeholder="密码"
            type="password"
            value={account.password}
            name="password"
            onChange={handleChange}
          />
          <FormControlLabel
            sx={{ justifyContent: "center" }}
            onChange={() => setAutoLogin(!autoLogin)}
            label={
              <Typography sx={{ userSelect: "none" }} variant="body2">
                七日内自动登录
              </Typography>
            }
            control={<Checkbox size="small" checked={autoLogin} />}
          />
        </Stack>
        <LoadingButton
          loading={status === AccountFormStatus.Posting}
          color={status}
          variant="contained"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          {buttonText}
        </LoadingButton>
      </Box>
      <Typography
        variant="body2"
        sx={{ color: "gray", mt: 2 }}
        textAlign="center"
      >
        暂无帐户？<Link onClick={toRegist}>点击注册</Link>
      </Typography>
    </AccountFrame>
  );
};

export default LoginPage;
