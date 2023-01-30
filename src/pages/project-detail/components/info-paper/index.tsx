import { Box, Container, Paper, Typography, Grid } from "@mui/material";
import { FC, useEffect } from "react";
import useProject from "../../hooks/use-project";
import GridRow from "../grid-row";

const InfoPaper: FC = () => {
  const { username, projectName, proj, fetchProject } = useProject();

  useEffect(() => {
    fetchProject();
  }, [username, projectName]);

  return (
    <Box sx={{ p: 2, mt: 2 }} component={Paper}>
      <Typography variant="h6" fontWeight="bold">
        基本信息
      </Typography>
      <Grid container sx={{ mt: 2 }} rowGap={2}>
        <GridRow label="项目名称" content={proj.projectName} />
        <GridRow label="Owner" content={proj.owner} />
        <GridRow label="Git地址" content={proj.gitUrl} />
        {proj.describe && <GridRow label="简介" content={proj.describe} />}
      </Grid>
    </Box>
  );
};

export default InfoPaper;
