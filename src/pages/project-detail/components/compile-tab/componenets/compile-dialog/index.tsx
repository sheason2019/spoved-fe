import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { FC, useEffect } from "react";
import LabelSelect from "../../../../../new/components/label-select";
import LabelSwitch from "../../../../../new/components/label-switch";
import LabelText from "../../../../../new/components/label-text";
import { EnvInput } from "../../../env-input";
import useCompileDialog from "../../hooks/use-compile-dialog";
import useCompileForm from "../../hooks/use-compile-form";
import useCompileImages from "../../hooks/use-compile-images";

const CompileDialog: FC = () => {
  const { open, handleClose } = useCompileDialog();
  const {
    form,
    error,
    handleSubmit,
    handleInput,
    handleReset,
    envPairs,
    setEnvPairs,
    validateEnvpair,
  } = useCompileForm();

  const { images, fetchImages } = useCompileImages();

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>创建编译工单</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <LabelText
            label="分支"
            labelWidth={80}
            sx={{ flex: 1 }}
            onChange={(e) => handleInput("branch", e.target.value)}
            placeholder="默认为master分支"
            value={form.branch}
            errText={error.branch}
          />
          <LabelSelect
            label="版本选择"
            labelWidth={80}
            sx={{ flex: 1 }}
            onChange={(e) => handleInput("version", e.target.value as any)}
            value={form.version}
            errText={error.version}
          >
            {["Patch", "Minor", "Major"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </LabelSelect>
          <LabelSelect
            label="镜像选择"
            labelWidth={80}
            sx={{ flex: 1 }}
            onChange={(e) => handleInput("image", e.target.value as string)}
            value={form.image}
            errText={error.image}
          >
            {images.map((image) => (
              <MenuItem key={image} value={image}>
                {image}
              </MenuItem>
            ))}
          </LabelSelect>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LabelSwitch
              label="编译环境"
              labelWidth={80}
              checked={form.production}
              onChange={(_, checked) => handleInput("production", checked)}
              errText={error.production}
            />
            <Typography variant="body2" color="GrayText">
              {form.production ? "生产环境" : "测试环境"}
            </Typography>
          </Stack>
        </Stack>
        <EnvInput
          production={form.production}
          envPairs={envPairs}
          nameOnblur={validateEnvpair}
          setEnvPairs={setEnvPairs}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleReset}>
          重置
        </Button>
        <Button variant="contained" onClick={handleSubmit}>
          提交工单
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompileDialog;
