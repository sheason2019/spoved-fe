import { Pagination } from "../common";

export interface CompileOrder {
  id?: number;
  projectId?: number;
  image?: string;
  version?: string;
  createAt?: number;
  operator?: string;
  branch?: string;
  production?: bool;
  env?: string;
  statusCode?: number;
}

export interface GetCompileOrdersPayload {
  projectId?: number;
  page?: number;
  pageSize?: number;
}

export interface GetCompileOrdersResponse {
  records?: CompileOrder[];
  pagination?: Pagination;
}

export interface GetOptionalImagesResponse {
  images?: string[];
}
