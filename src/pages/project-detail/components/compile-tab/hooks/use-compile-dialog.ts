import { atom, useAtom } from "jotai";

const compileDialogAtom = atom({
  open: false,
});

const useCompileDialog = () => {
  const [dialog, setDialog] = useAtom(compileDialogAtom);

  const handleOpen = () => setDialog({ open: true });
  const handleClose = () => setDialog({ open: false });

  return {
    handleOpen,
    handleClose,
    open: dialog.open,
  };
};

export default useCompileDialog;
