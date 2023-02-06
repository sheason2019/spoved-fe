import { Pagination } from "../common";

export interface GetCompileRecordsPayload {
  projectId?: number;
  pagination?: Pagination;
}

export interface GetCompileRecordsResponse {
  records?: CompileRecord[];
  pagination?: Pagination;
}

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
