import { useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../../api-lib/project";
import useProjectClient from "../../../common/hooks/use-client/use-project-client";

const useProject = () => {
  const { username, projectName } = useParams();

  const [proj, setProj] = useState<Project>({});
  const { projectClient } = useProjectClient();

  const fetchProject = async () => {
    const [data, err] = await projectClient.GetProject({
      username,
      projectName,
    });

    if (err) {
      return console.error(err);
    }
    setProj(data);
  };

  return {
    proj,
    username,
    projectName,
    fetchProject,
  };
};

export default useProject;
