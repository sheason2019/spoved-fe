import { useState } from "react";
import { Pagination } from "../../../../../api-lib/common";
import { CompileOrder } from "../../../../../api-lib/compile";
import { DeployOrder } from "../../../../../api-lib/deploy";
import useDeployClient from "../../../../../common/hooks/use-client/use-deploy-client";
import useProject from "../../../hooks/use-project";

const useDeployOrders = () => {
  const { proj } = useProject();

  const { client } = useDeployClient();

  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    pageSize: 25,
  });

  const [orders, setOrders] = useState<DeployOrder[]>([]);

  const fetchData = async () => {
    const [data, err] = await client.GetDeployOrders({
      projectId: proj.id,
      page: pagination.page,
      pageSize: pagination.pageSize,
    });
    if (err) {
      throw err;
    }

    setOrders(data.records!);
    setPagination(data.pagination!);
  };

  return {
    proj,

    orders,
    fetchData,

    pagination,
    setPagination,
  };
};

export default useDeployOrders;
