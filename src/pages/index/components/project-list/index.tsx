import { List, ListItemButton } from "@mui/material";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useProjects from "../../hooks/use-projects";

const ProjectList: FC = () => {
  const navigate = useNavigate();
  const { projects, fetchProjects } = useProjects();

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <List>
      {projects.map((proj) => (
        <ListItemButton
          onClick={() => navigate(`/${proj.owner}/${proj.projectName}`)}
          key={proj.id}
        >
          {proj.projectName}
        </ListItemButton>
      ))}
    </List>
  );
};

export default ProjectList;
