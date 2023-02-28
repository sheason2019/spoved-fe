import { Pagination } from "../common";
import { CompileOrder } from "../compile";

export interface GetDeployOrdersResponse {
  records?: DeployOrder[];
  pagination?: Pagination;
}

export interface GetOptionalImagesResponse {
  images?: string[];
}

export interface DeployOrder {
  id?: number;
  image?: string;
  createAt?: number;
  operator?: string;
  miniflow?: bool;
  headerPairs?: HeaderPair[];
  compileOrder?: CompileOrder;
  statusCode?: number;
}

export interface HeaderPair {
  header?: string;
  value?: string;
}

export interface GetDeployOrdersPayload {
  projectId?: number;
  page?: number;
  pageSize?: number;
}
