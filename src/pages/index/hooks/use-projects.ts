import { useState } from "react";
import { Project } from "../../../api-lib/project";
import useProjectClient from "../../../common/hooks/use-client/use-project-client";
import { useDialog } from "../../../common/hooks/use-dialog";

export const useProjects = () => {
  const DialogApi = useDialog();
  const { projectClient } = useProjectClient();

  const [projects, setProjects] = useState<Project[]>([]);

  const fetchProjects = async () => {
    const [data, err] = await projectClient.GetProjects({
      page: 1,
      pageSize: 25,
    });
    if (err) {
      return DialogApi.error(err.message);
    }

    setProjects(data.projects!);
  };

  return { fetchProjects, projects };
};

export default useProjects;
