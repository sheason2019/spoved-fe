import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useParams } from "react-router-dom";
import GridRow from "./components/grid-row";

const ProjectDetail: FC = () => {
  const { username, projectName } = useParams();

  return (
    <Box sx={{ background: "whitesmoke", flex: 1 }}>
      <Container>
        <Box component={Paper} sx={{ p: 2, mt: 2 }}>
          <Typography variant="h6" fontWeight="bold">
            基本信息
          </Typography>
          <Grid container sx={{ mt: 2 }} rowGap={2}>
            <GridRow label="项目名称" content={projectName} />
            <GridRow label="Owner" content={username} />
            <GridRow label="Git地址" content={""} />
            <GridRow label="简介" content={""} />
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default ProjectDetail;
