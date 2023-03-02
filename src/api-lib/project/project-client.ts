import axios, { AxiosInstance } from "axios";
import { GetProjectPayload, Project, GetProjectsResponse } from ".";
import { Pagination } from "../common";

interface ClientConfig {
  host?: string;
  ins?: AxiosInstance;
}
export class ProjectApiClient {
  host: string;
  ins: AxiosInstance;

  constructor(config?: ClientConfig) {
    this.host = config?.host ?? "";
    this.ins = config?.ins ?? axios.create();
  }
  GetProjects(pagination: Pagination) {
    return this.ins.get<GetProjectsResponse>(
      this.host + "/ProjectApi.Projects",
      { params: pagination }
    );
  }
  PostProject(project: Project) {
    return this.ins.post<Project>(this.host + "/ProjectApi.Project", project);
  }
  GetProject(payload: GetProjectPayload) {
    return this.ins.get<Project>(this.host + "/ProjectApi.Project", {
      params: payload,
    });
  }
}
