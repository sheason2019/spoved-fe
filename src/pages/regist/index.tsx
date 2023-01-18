import { FC } from "react";
import { Box, Stack, Typography, TextField, Button } from "@mui/material";
import Link from "../../common/components/link";
import AccountFrame from "../login/shared/components/account-frame";
import useRegist from "./hooks/use-regist";

const RegistPage: FC = () => {
  const { account, toLogin } = useRegist();
  return (
    <AccountFrame title="用户注册">
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
          <TextField
            size="small"
            placeholder="重复密码"
            type="password"
            value={account.repassword}
          />
        </Stack>
        <Button variant="contained" fullWidth sx={{ mt: 2 }}>
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
