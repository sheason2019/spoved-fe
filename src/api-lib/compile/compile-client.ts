import axios, { AxiosInstance } from "axios";
import {
  CompileRecord,
  GetCompileRecordsPayload,
  GetCompileRecordsResponse,
} from ".";

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
  GetCompileRecords(payload: GetCompileRecordsPayload) {
    return this.ins.get<GetCompileRecordsResponse>(
      this.host + "/CompileApi.CompileRecords",
      { params: payload }
    );
  }
}
