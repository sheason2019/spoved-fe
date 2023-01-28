import {
  Box,
  Button,
  Container,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FC } from "react";
import LabelSelect from "./components/label-select";
import LabelText from "./components/label-text";
import useCreateProject from "./hooks/use-create-project";

const MOCK_IMAGE_OPTIONS = [
  { name: "nginx" },
  { name: "go" },
  { name: "node-16" },
];

const NewProjectPage: FC = () => {
  const { handleSubmit, handleChange, handleSelect, form } = useCreateProject();

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
                multiline
                fullWidth
              />
            </Box>
          </Stack>
          <Typography sx={{ mt: 2 }} fontWeight="bold">
            项目信息
          </Typography>
          <Stack pt={2} spacing={1}>
            <LabelSelect
              label="构建镜像"
              labelWidth={80}
              name="iamgeBuild"
              value={form.imageBuild}
              sx={{ width: 380 }}
              onChange={handleSelect}
            >
              {MOCK_IMAGE_OPTIONS.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </LabelSelect>
            <LabelSelect
              label="发布镜像"
              labelWidth={80}
              sx={{ width: 380 }}
              name="imagePublish"
              value={form.imagePublish}
              onChange={handleSelect}
            >
              {MOCK_IMAGE_OPTIONS.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </LabelSelect>
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
