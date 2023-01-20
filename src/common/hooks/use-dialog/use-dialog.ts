import { atom, useSetAtom } from "jotai";
import { ReactNode } from "react";

export interface DialogProps {
  variant: "error" | "success" | "warning" | "info";
  title?: ReactNode;
  content?: ReactNode;
  onOkText?: string;
  // 点击确认按钮时执行的逻辑，若返回值为true则关闭Dialog
  onOk?: () => boolean;
  onCancelText?: string;
  // 点击取消按钮时执行的逻辑，若返回值为true则关闭Dialog
  onCancel?: () => boolean;
  clickAwayToCancel?: boolean;
}

type SubDialogProps = Omit<DialogProps, "variant">;

type IDialog = {
  [T in DialogProps["variant"]]: (subState: SubDialogProps | string) => void;
} & {
  (state: DialogProps): void;
};

export interface DialogAtom {
  [timeStamp: number]: DialogProps;
}

export const dialogAtom = atom<DialogAtom>({});

const VARIANT_DEFAULT_TITLE: Record<DialogProps["variant"], string> = {
  error: "错误！",
  success: "成功！",
  warning: "警告！",
  info: "通知！",
};

const useDialog = () => {
  const setDialog = useSetAtom(dialogAtom);

  const DialogApi: any = (state: DialogProps) => {
    setDialog((prev) => ({ ...prev, [new Date().getTime()]: state }));
  };

  const variants: DialogProps["variant"][] = [
    "error",
    "success",
    "warning",
    "info",
  ];
  variants.forEach((variant) => {
    DialogApi[variant] = (args: SubDialogProps | string) => {
      if (typeof args === "object") {
        DialogApi({ variant, ...args });
      } else {
        DialogApi({
          variant,
          content: args,
          title: VARIANT_DEFAULT_TITLE[variant],
        });
      }
    };
  });

  return DialogApi as IDialog;
};

export default useDialog;
