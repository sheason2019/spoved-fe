import { FC, PropsWithChildren, useEffect, useMemo } from "react";

import {
  Stack,
  Paper,
  Typography,
  CircularProgress,
  Button,
  Box,
} from "@mui/material";
import useCrypto from "../../hooks/use-crypto";
import useCheckLogin from "../../../../index/shared/hooks/use-check-login";
import { useNavigate } from "react-router-dom";

interface IProps {
  title: string;
  minHeight: number;
}

const AccountFrame: FC<PropsWithChildren<IProps>> = ({
  children,
  title,
  minHeight,
}) => {
  const navigate = useNavigate();
  const { currentUser, checkLogin } = useCheckLogin();
  const { crypto, fetchCrypto } = useCrypto();

  const contentRender = useMemo(() => {
    // 没有获取到加密信息时，需要展示加载中页面
    if (!crypto) {
      return (
        <Stack alignItems="center" justifyContent="center" height="100%">
          <Box sx={{ mt: 6 }}>
            <CircularProgress />
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            正在加载加密信息
          </Typography>
          <Button sx={{ mt: 1 }} variant="contained" onClick={fetchCrypto}>
            点击重试
          </Button>
        </Stack>
      );
    }
    // 获取到加密信息后展示表单
    return (
      <>
        <Typography variant="h5" textAlign="center">
          {title}
        </Typography>
        {children}
      </>
    );
  }, [crypto, title, children]);

  const preLogin = async () => {
    const isLogin = await checkLogin();
    if (isLogin) {
      // 如果已经登录则自动跳转到首页
      return navigate("/");
    }

    fetchCrypto();
  };

  useEffect(() => {
    preLogin();
  }, [currentUser]);

  return (
    <Stack sx={{ flex: 1 }} justifyContent="center" alignItems="center">
      <Paper
        elevation={0}
        sx={{
          py: 2,
          width: 360,
          minHeight,
          border: "1px solid rgba(36,41,47, 0.4)",
        }}
      >
        {contentRender}
      </Paper>
    </Stack>
  );
};

export default AccountFrame;
