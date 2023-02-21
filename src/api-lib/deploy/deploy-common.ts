import { Pagination } from "../common";

export interface DeployOrder {
  id?: number;
  projectId?: number;
  image?: string;
  versoin?: string;
  createAt?: number;
  operator?: string;
  compileOrderId?: number;
  statusCode?: number;
}

export interface GetDeployOrdersPayload {
  projectId?: number;
  page?: number;
  pageSize?: number;
}

export interface GetDeployOrdersResponse {
  records?: DeployOrder[];
  pagination?: Pagination;
}
