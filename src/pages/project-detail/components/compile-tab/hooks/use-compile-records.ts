import { useState } from "react";
import { Pagination } from "../../../../../api-lib/common";
import { CompileRecord } from "../../../../../api-lib/compile";
import useCompileClient from "../../../../../common/hooks/use-client/use-compile-client";
import useProject from "../../../hooks/use-project";

const useCompileRecords = () => {
  const { proj } = useProject();

  const { client } = useCompileClient();

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 25,
  });

  const [records, setRecords] = useState<CompileRecord[]>([]);

  const fetchData = async () => {
    const [data, err] = await client.GetCompileRecords({
      projectId: proj.id,
      pagination,
    });
    if (err) {
      throw err;
    }

    setRecords(data.records!);
    setPagination(data.pagination!);
  };

  return {
    proj,

    records,
    fetchData,

    pagination,
    setPagination,
  };
};

export default useCompileRecords;
