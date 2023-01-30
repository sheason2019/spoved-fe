import { FC } from "react";
import { Box, Container } from "@mui/material";
import InfoPaper from "./components/info-paper";
import ActionTabs from "./components/action-tabs";

const ProjectDetail: FC = () => {
  return (
    <Box sx={{ background: "whitesmoke", flex: 1 }}>
      <Container>
        <InfoPaper />
        <ActionTabs />
      </Container>
    </Box>
  );
};

export default ProjectDetail;
