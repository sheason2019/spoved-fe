import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from "@mui/material";
import { FC } from "react";
import LabelSelect from "../../../../../new/components/label-select";
import LabelText from "../../../../../new/components/label-text";
import useCompileDialog from "../../hooks/use-compile-dialog";
import useCompileForm from "../../hooks/use-compile-form";

const CompileDialog: FC = () => {
  const { open, handleClose } = useCompileDialog();
  const { form, handleSubmit, handleInput } = useCompileForm();

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>创建编译工单</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <LabelText
            label="分支"
            labelWidth={80}
            sx={{ width: 380 }}
            onChange={(e) => handleInput("branch", e.target.value)}
            placeholder="默认为master分支"
            value={form.branch}
          />
          <LabelSelect
            label="版本选择"
            labelWidth={80}
            sx={{ width: 380 }}
            onChange={(e) => handleInput("version", e.target.value as any)}
            value={form.version}
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
            sx={{ width: 380 }}
            onChange={(e) => handleInput("image", e.target.value as string)}
            value={form.image}
          >
            <MenuItem value="node:16-alpine">node:16-alpine</MenuItem>
          </LabelSelect>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleSubmit}>
          提交
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompileDialog;
