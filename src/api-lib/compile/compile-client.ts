import axios, { AxiosInstance } from "axios";
import {
  CompileOrder,
  GetCompileOrdersPayload,
  GetCompileOrdersResponse,
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
  PostCompileOrder(payload: CompileOrder) {
    return this.ins.post<CompileOrder>(
      this.host + "/CompileApi.CompileOrder",
      payload
    );
  }
  GetCompileOrders(payload: GetCompileOrdersPayload) {
    return this.ins.get<GetCompileOrdersResponse>(
      this.host + "/CompileApi.CompileOrders",
      { params: payload }
    );
  }
}
