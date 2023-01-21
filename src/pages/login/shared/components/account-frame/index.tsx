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

interface IProps {
  title: string;
  minHeight: number;
}

const AccountFrame: FC<PropsWithChildren<IProps>> = ({
  children,
  title,
  minHeight,
}) => {
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

  useEffect(() => {
    fetchCrypto();
  }, []);

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
