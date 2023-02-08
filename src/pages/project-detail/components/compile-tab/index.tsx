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
          编译记录
        </Typography>
        <Button onClick={handleOpen} variant="contained">
          点击编译
        </Button>
      </Stack>
      <RecordList />
      <Pagination
        sx={{ ".MuiPagination-ul": { justifyContent: "center" }, mt: 2, mb: 1 }}
      />
      <CompileDialog />
    </>
  );
};

export default CompileTab;
