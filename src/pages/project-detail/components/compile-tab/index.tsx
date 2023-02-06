import { Button, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CompileDialog from "./componenets/compile-dialog";
import RecordsList from "./componenets/records-list";
import useCompileDialog from "./hooks/use-compile-dialog";

const CompileTab: FC = () => {
  const { handleOpen } = useCompileDialog();

  return (
    <>
      <Stack direction="row" alignItems="center">
        <Typography fontWeight="bold" sx={{ flex: 1 }}>
          编译记录
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          点击编译
        </Button>
      </Stack>
      <RecordsList />
      <CompileDialog />
    </>
  );
};

export default CompileTab;
