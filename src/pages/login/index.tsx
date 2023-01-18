import { FC } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import Link from "../../common/components/link";
import useLogin from "./hooks/use-login";
import AccountFrame from "./shared/components/account-frame";

const LoginPage: FC = () => {
  const { account, setAccount, toRegist } = useLogin();

  return (
    <AccountFrame title="用户登录">
      <Box mt={3} px={3}>
        <Stack spacing={1}>
          <TextField
            size="small"
            placeholder="用户名"
            value={account.username}
          />
          <TextField
            size="small"
            placeholder="密码"
            type="password"
            value={account.password}
          />
        </Stack>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
          登录
        </Button>
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
