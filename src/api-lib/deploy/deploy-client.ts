import axios, { AxiosInstance } from "axios";
import {
  GetDeployOrdersResponse,
  GetOptionalImagesResponse,
  DeployOrder,
  GetDeployOrdersPayload,
} from ".";

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
  PostDeployOrder(order: DeployOrder) {
    return this.ins.post<DeployOrder>(
      this.host + "/DeployApi.DeployOrder",
      order
    );
  }
  GetOptionalImages() {
    return this.ins.get<GetOptionalImagesResponse>(
      this.host + "/DeployApi.OptionalImages"
    );
  }
}
