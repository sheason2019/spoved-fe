import { Pagination } from "../common";

export interface CompileRecord {
  id?: number;
  projectId?: number;
  image?: string;
  version?: string;
  createAt?: number;
  operator?: string;
  branch?: string;
  output?: string;
  statusCode?: number;
}

export interface GetCompileRecordsPayload {
  projectId?: number;
  page?: number;
  pageSize?: number;
}

export interface GetCompileRecordsResponse {
  records?: CompileRecord[];
  pagination?: Pagination;
}
