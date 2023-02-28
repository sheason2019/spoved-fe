import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
} from "@mui/material";
import { FC, useEffect } from "react";
import LabelSelect from "../../../../../new/components/label-select";
import LabelSwitch from "../../../../../new/components/label-switch";
import LabelText from "../../../../../new/components/label-text";
import { HeaderInput } from "../../../header-input";
import useDeployDialog from "../../hooks/use-deploy-dialog";
import useDeployForm from "../../hooks/use-deploy-form";
import useDeployImages from "../../hooks/use-deploy-images";

export const DeployDialog: FC = () => {
  const {
    error,
    form,
    headerPairs,
    setHeaderPairs,
    handleInput,
    handleSubmit,
    handleReset,
    validateHeader,
  } = useDeployForm();
  const { dialog, open, handleClose } = useDeployDialog();
  const { images, fetchImages } = useDeployImages();

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>创建部署工单</DialogTitle>
      <DialogContent>
        <Stack spacing={1}>
          <LabelText
            label="Compile Order ID"
            labelWidth={140}
            sx={{ flex: 1 }}
            value={dialog.compileOrder?.id}
            disabled
          />
          <LabelText
            label="部署版本"
            labelWidth={140}
            sx={{ flex: 1 }}
            value={dialog.compileOrder?.version}
            disabled
          />
          <LabelSelect
            label="部署镜像"
            labelWidth={140}
            sx={{ flex: 1 }}
            onChange={(e) => handleInput("image", e.target.value as any)}
            value={form.image}
            errText={error.image}
          >
            {images.map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </LabelSelect>
          <LabelSwitch
            label="小流量部署"
            labelWidth={140}
            onChange={(_, checked) => handleInput("miniflow", checked)}
            errText={error.miniflow}
            checked={form.miniflow}
          />
          {form.miniflow && (
            <HeaderInput
              headerPairs={headerPairs}
              setHeaderPairs={setHeaderPairs}
              headerOnblur={validateHeader}
            />
          )}
        </Stack>
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

export default DeployDialog;
