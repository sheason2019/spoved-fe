import axios, { AxiosInstance } from "axios";
import { GetDeployOrdersPayload, GetDeployOrdersResponse } from ".";

interface ClientConfig {
  host?: string;
  ins?: AxiosInstance;
}
export class DeployApiClient {
  host: string;
  ins: AxiosInstance;

  constructor(config?: ClientConfig) {
    this.host = config?.host ?? "";
    this.ins = config?.ins ?? axios.create();
  }
  GetDeployOrders(payload: GetDeployOrdersPayload) {
    return this.ins.get<GetDeployOrdersResponse>(
      this.host + "/DeployApi.DeployOrders",
      { params: payload }
    );
  }
}
