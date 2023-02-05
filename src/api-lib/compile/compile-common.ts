import { Pagination } from "../common";

export interface CompileRecord {
  projectId?: number;
  image?: string;
  version?: string;
  createAt?: number;
  operator?: string;
  branch?: string;
  output?: string;
  statusCode?: number;
}

export interface GetCompileRecordResponse {
  pagination?: Pagination;
  records?: CompileRecord;
}
