import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useSetAtom } from "jotai";
import { FC, useState } from "react";
import {
  dialogAtom,
  DialogProps,
} from "../../../../hooks/use-dialog/use-dialog";

interface IGlobalDialogProps extends DialogProps {
  id: number;
}

const GlobalDialog: FC<IGlobalDialogProps> = ({
  id,
  title,
  content,
  onOk,
  onOkText = "确定",
  onCancel,
  onCancelText = "取消",
  clickAwayToCancel = true,
}) => {
  const setDialog = useSetAtom(dialogAtom);
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setTimeout(
      () =>
        setDialog((state) => {
          const next = { ...state };
          delete next[id];
          return next;
        }),
      1000
    );
  };

  const cancel = () => {
    let close = true;
    if (onCancel) {
      close = onCancel();
    }
    close && handleClose();
  };
  const ok = () => {
    let close = true;
    if (onOk) {
      close = onOk();
    }
    close && handleClose();
  };

  return (
    <Dialog open={open} onClose={clickAwayToCancel ? cancel : undefined}>
      {title && <DialogTitle>{title}</DialogTitle>}
      {content && <DialogContent>{content}</DialogContent>}
      <DialogActions>
        {onCancel && <Button onClick={cancel}>{onCancelText}</Button>}
        {
          <Button variant="contained" onClick={ok}>
            {onOkText}
          </Button>
        }
      </DialogActions>
    </Dialog>
  );
};

export default GlobalDialog;