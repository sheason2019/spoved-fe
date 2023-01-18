import { FC, PropsWithChildren } from "react";

import { Stack, Paper, Typography } from "@mui/material";

interface IProps {
  title: string;
}

const AccountFrame: FC<PropsWithChildren<IProps>> = ({ children, title }) => {
  return (
    <Stack sx={{ flex: 1 }} justifyContent="center" alignItems="center">
      <Paper
        elevation={0}
        sx={{
          py: 2,
          width: 360,
          border: "1px solid rgba(36,41,47, 0.4)",
        }}
      >
        <Typography variant="h5" textAlign="center">
          {title}
        </Typography>
        {children}
      </Paper>
    </Stack>
  );
};

export default AccountFrame;
