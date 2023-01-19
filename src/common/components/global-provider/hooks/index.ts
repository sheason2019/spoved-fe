import { atom, useSetAtom } from "jotai";
import { ReactNode } from "react";

export interface ModalState {
  variant: "error" | "success" | "warning" | "info";
  title?: ReactNode;
  content?: ReactNode;
  onOk?: () => any;
  onCancel?: () => any;
}

type SubModalState = Omit<ModalState, "variant">;

interface IModal {
  (state: ModalState): void;
  [T: string]: (subState: SubModalState) => void;
}

interface ModalAtom {
  [timeStamp: number]: ModalState;
}

export const modalAtom = atom<ModalAtom>({});

const useModal = () => {
  const setModal = useSetAtom(modalAtom);

  const ModalApi: any = (state: ModalState) => {
    setModal((prev) => ({ ...prev, [new Date().getTime()]: state }));
  };

  const variants: ModalState["variant"][] = [
    "error",
    "success",
    "warning",
    "info",
  ];
  variants.forEach((variant) => {
    ModalApi[variant] = (state: SubModalState) => {
      ModalApi({ variant, ...state });
    };
  });

  return ModalApi as IModal;
};

export default useModal;
