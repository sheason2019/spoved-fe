import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";

const CompileTab: FC = () => {
  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography fontWeight="bold" sx={{ flex: 1 }}>
          编译记录
        </Typography>
        <Button variant="contained">点击编译</Button>
      </Stack>
    </>
  );
};

export default CompileTab;
