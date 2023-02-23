import { atom, useAtom } from "jotai";

const deployDialogAtom = atom({
  open: false,
});

const useDeployDialog = () => {
  const [dialog, setDialog] = useAtom(deployDialogAtom);

  const handleOpen = () => setDialog({ open: true });
  const handleClose = () => setDialog({ open: false });

  return {
    handleOpen,
    handleClose,
    open: dialog.open,
  };
};

export default useDeployDialog;
