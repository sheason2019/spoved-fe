import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import DeployOrderList from "./components/deploy-order-list";

const DeployTab: FC = () => {
  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ height: "2.5rem" }}>
        <Typography fontWeight="bold" sx={{ flex: 1 }}>
          部署工单
        </Typography>
      </Stack>
      <DeployOrderList />
    </>
  );
};

export default DeployTab;
