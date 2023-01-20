import { useAtomValue } from "jotai";
import { FC } from "react";
import {
  dialogAtom,
} from "../../../../hooks/use-dialog/use-dialog";
import GlobalDialog from "../global-dialog";

const DialogGroup: FC = () => {
  const dialogState = useAtomValue(dialogAtom);

  return (
    <>
      {Object.keys(dialogState).map((key) => (
        <GlobalDialog
          key={key}
          id={Number(key)}
          {...dialogState[Number(key)]}
        />
      ))}
    </>
  );
};

export default DialogGroup;
