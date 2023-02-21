import { Button, Pagination, Stack, Typography } from "@mui/material";
import { FC } from "react";
import CompileDialog from "./componenets/compile-dialog";
import RecordList from "./componenets/record-list";
import useCompileDialog from "./hooks/use-compile-dialog";

const CompileTab: FC = () => {
  const { handleOpen } = useCompileDialog();

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
      <RecordList />
      <CompileDialog />
    </>
  );
};

export default CompileTab;
