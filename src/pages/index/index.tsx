import { Box, Button, List, Stack, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginWrapper from "../../common/components/login-wrapper";
import ProjectList from "./components/project-list";
import useCheckLogin from "./shared/hooks/use-check-login";

const IndexPage: FC = () => {
  const navigate = useNavigate();
  const { checkLogin, currentUser } = useCheckLogin();

  const loginGuard = async () => {
    const isLogin = await checkLogin();

    if (!isLogin) {
      navigate("/login");
    }
  };

  useEffect(() => {
    loginGuard();
  }, [currentUser]);

  return (
    <LoginWrapper>
      <Stack direction="row" sx={{ background: "whitesmoke", flex: 1 }}>
        <Box sx={{ width: 320, background: "#FFFFFF", px: 3, py: 2 }}>
          <Stack sx={{ width: "100%" }} direction="row" alignItems="center">
            <Typography flex={1} fontWeight="bold">
              项目列表
            </Typography>
            <Button variant="contained" onClick={() => navigate("/new")}>
              新建
            </Button>
          </Stack>
          <ProjectList />
        </Box>
        <List>
          <Typography variant="h5" sx={{ px: 2, py: 1.25 }}>
            动态
          </Typography>
        </List>
      </Stack>
    </LoginWrapper>
  );
};

export default IndexPage;
