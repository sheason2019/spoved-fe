import { CompileOrder } from "../compile";
import { Pagination } from "../common";

export interface GetOptionalImagesResponse {
  images?: string[];
}

export interface DeployOrder {
  id?: number;
  image?: string;
  createAt?: number;
  operator?: string;
  miniflow?: boolean;
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

export interface GetDeployOrdersResponse {
  records?: DeployOrder[];
  pagination?: Pagination;
}
