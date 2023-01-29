import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import LabelText from "./components/label-text";
import useCreateProject from "./hooks/use-create-project";

const NewProjectPage: FC = () => {
  const { handleSubmit, handleChange, form } = useCreateProject();

  return (
    <Box sx={{ background: "whitesmoke", flex: 1, py: 2 }}>
      <Container component={Paper} sx={{ p: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <Typography variant="h5">创建新项目</Typography>
          <Typography sx={{ mt: 2 }} fontWeight="bold">
            基本信息
          </Typography>
          <Stack spacing={1} pt={2}>
            <LabelText
              label="创建人"
              labelWidth={80}
              sx={{ width: 380 }}
              name="projName"
              value={form.owner}
              disabled
            />
            <LabelText
              label="项目名称"
              labelWidth={80}
              sx={{ width: 380 }}
              onChange={handleChange}
              name="projName"
              value={form.projName}
              placeholder="请填写项目名称"
            />
            <LabelText
              label="Git Url"
              labelWidth={80}
              sx={{ width: 380 }}
              onChange={handleChange}
              name="gitUrl"
              value={form.gitUrl}
              placeholder="请填写仓库地址"
            />
            <Box>
              <Typography>项目简介（非必填）</Typography>
              <TextField
                name="describe"
                value={form.describe}
                onChange={handleChange}
                placeholder="在此处填入项目的简介信息"
                multiline
                minRows={3}
                maxRows={5}
                sx={{ mt: 0.5 }}
                fullWidth
              />
            </Box>
          </Stack>
          <Button variant="contained" type="submit" sx={{ mt: 2 }}>
            创建项目
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default NewProjectPage;
