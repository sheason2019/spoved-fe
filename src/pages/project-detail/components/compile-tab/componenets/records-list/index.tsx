import { Box, Stack } from "@mui/material";
import { FC, useEffect } from "react";
import useCompileRecords from "../../hooks/use-compile-records";

const RecordsList: FC = () => {
  const { proj, records, fetchData, pagination, setPagination } =
    useCompileRecords();

  useEffect(() => {
    fetchData();
  }, [proj.id]);

  return (
    <Stack spacing={2}>
      {records.map((record) => (
        <Box key={record.id}>{JSON.stringify(record)}</Box>
      ))}
    </Stack>
  );
};

export default RecordsList;
