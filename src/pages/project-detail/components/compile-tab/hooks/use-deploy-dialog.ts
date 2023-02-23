import { atom, useAtom } from "jotai";
import { CompileOrder } from "../../../../../api-lib/compile";

interface IDeployDialog {
  open: boolean;
  compileOrder: CompileOrder | null;
}

const deployDialogAtom = atom<IDeployDialog>({
  open: false,
  compileOrder: null,
});

export const useDeployDialog = () => {
  const [dialog, setDialog] = useAtom(deployDialogAtom);

  const handleOpen = (compileOrder: CompileOrder) =>
    setDialog({ compileOrder, open: true });
  const handleClose = () => setDialog({ compileOrder: null, open: false });

  return {
    dialog,
    open: dialog.open,
    handleOpen,
    handleClose,
  };
};

export default useDeployDialog;
