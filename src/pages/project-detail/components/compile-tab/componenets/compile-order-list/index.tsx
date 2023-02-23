import { FC, useEffect } from "react";
import {
  Button,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import useCompileOrders from "../../hooks/use-compile-orders";
import STATUS_TEXT from "../../constant";
import { timeStr } from "../../../../../../common/utils/time-str";

const CompileOrderList: FC = () => {
  const { proj, orders, fetchData, pagination } = useCompileOrders();

  useEffect(() => {
    if (proj.id) {
      fetchData();
    }
  }, [proj.id]);

  return (
    <Paper sx={{ mt: 2 }} variant="outlined">
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>编译工单 ID</TableCell>
              <TableCell>操作人</TableCell>
              <TableCell>编译版本</TableCell>
              <TableCell>编译镜像</TableCell>
              <TableCell>编译状态</TableCell>
              <TableCell>创建时间</TableCell>
              <TableCell>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell component="th" scope="row">
                  {order.id}
                </TableCell>
                <TableCell>{order.operator}</TableCell>
                <TableCell>{order.version}</TableCell>
                <TableCell>{order.image}</TableCell>
                <TableCell>{STATUS_TEXT[order.statusCode!]}</TableCell>
                <TableCell>{timeStr(order.createAt ?? 0)}</TableCell>
                <TableCell>
                  <Button variant="outlined">查看详情</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack direction="row" alignItems="center">
        <Pagination sx={{ my: 1, flex: 1 }} />
        <Typography variant="body2" sx={{ mx: 2 }}>
          总计工单数：{pagination.itemCounts ?? 0}
        </Typography>
      </Stack>
    </Paper>
  );
};

export default CompileOrderList;
