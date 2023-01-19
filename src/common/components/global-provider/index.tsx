import { FC, PropsWithChildren } from "react";
import DialogGroup from "./components/dialog-group";

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <DialogGroup />
      {children}
    </>
  );
};

export default GlobalProvider;
