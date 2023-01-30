import { Pagination } from "../common";

export interface Project {
  id?: number;
  owner?: string;
  projectName?: string;
  gitUrl?: string;
  describe?: string;
}

export interface GetProjectsResponse {
  projects?: Project[];
  pagination?: Pagination;
}

export interface GetProjectPayload {
  username?: string;
  projectName?: string;
}
