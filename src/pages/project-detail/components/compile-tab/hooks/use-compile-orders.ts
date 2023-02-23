import { atom, useAtom } from "jotai";
import { Pagination } from "../../../../../api-lib/common";
import { CompileOrder } from "../../../../../api-lib/compile";
import useCompileClient from "../../../../../common/hooks/use-client/use-compile-client";
import useProject from "../../../hooks/use-project";

const compileOrdersAtom = atom<CompileOrder[]>([]);
const compileOrderPagination = atom<Pagination>({
  page: 1,
  pageSize: 25,
});

const useCompileOrders = () => {
  const { proj } = useProject();

  const { client } = useCompileClient();

  const [pagination, setPagination] = useAtom(compileOrderPagination);

  const [orders, setOrders] = useAtom(compileOrdersAtom);

  const fetchData = async () => {
    const [data, err] = await client.GetCompileOrders({
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

export default useCompileOrders;
