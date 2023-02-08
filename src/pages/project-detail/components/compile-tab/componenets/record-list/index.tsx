import { FC, useEffect } from "react";
import { Stack } from "@mui/material";

import RecordItem from "../record-item";
import useCompileRecords from "../../hooks/use-compile-records";

const RecordList: FC = () => {
  const { proj, records, fetchData, pagination, setPagination } =
    useCompileRecords();

  useEffect(() => {
    fetchData();
  }, [proj.id]);

  return (
    <Stack spacing={2} sx={{ mt: 2 }}>
      {records.map((record) => (
        <RecordItem key={record.id} record={record} />
      ))}
    </Stack>
  );
};

export default RecordList;
