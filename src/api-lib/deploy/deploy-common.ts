import { CompileOrder } from "../compile";
import { Pagination } from "../common";

export interface DeployOrder {
  id?: number;
  image?: string;
  createAt?: number;
  operator?: string;
  miniflow?: bool;
  compileOrder?: CompileOrder;
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

export interface GetOptionalImagesResponse {
  images?: string[];
}
