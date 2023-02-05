import { Box, Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import LoginWrapper from "../../common/components/login-wrapper";
import SshPubKey from "./ssh-pub-key";

const ProfilePage: FC = () => {
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5">账号信息</Typography>
      <LoginWrapper>
        <SshPubKey />
      </LoginWrapper>
    </Container>
  );
};

export default ProfilePage;
