import axios, { AxiosInstance } from "axios";
import { GetCompileRecordResponse, CompileRecord } from ".";
import { Pagination } from "../common";

interface ClientConfig {
  host?: string;
  ins?: AxiosInstance;
}
export class CompileApiClient {
  host: string;
  ins: AxiosInstance;

  constructor(config?: ClientConfig) {
    this.host = config?.host ?? "";
    this.ins = config?.ins ?? axios.create();
  }
  PostCompile(payload: CompileRecord) {
    return this.ins.post<CompileRecord>(
      this.host + "/CompileApi.Compile",
      payload
    );
  }
  GetCompileRecords(pagination: Pagination) {
    return this.ins.get<GetCompileRecordResponse>(
      this.host + "/CompileApi.CompileRecords",
      { params: pagination }
    );
  }
}
