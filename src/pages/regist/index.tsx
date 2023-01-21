import { FC } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import Link from "../../common/components/link";
import AccountFrame from "../login/shared/components/account-frame";
import useRegist from "./hooks/use-regist";
import ErrorText from "../login/shared/components/error-text";

const RegistPage: FC = () => {
  const {
    account,
    errors,
    handleChange,
    handleSubmit,
    toLogin,
    validateUsername,
    validatePassword,
    validateRepassword,
  } = useRegist();

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
        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          注册
        </Button>
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
