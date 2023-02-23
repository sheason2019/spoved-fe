import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import useDeployDialog from "./hooks/use-deploy-dialogs";
import DeployOrderList from "./components/deploy-order-list";

const DeployTab: FC = () => {
  const { handleOpen } = useDeployDialog();

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography fontWeight="bold" sx={{ flex: 1 }}>
          编译工单
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          创建工单
        </Button>
      </Stack>
      <DeployOrderList />
    </>
  );
};

export default DeployTab;
