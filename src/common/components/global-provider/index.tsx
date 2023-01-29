import { FC, PropsWithChildren, useEffect, useState } from "react";
import useCheckLogin from "../../../pages/index/shared/hooks/use-check-login";
import DialogGroup from "./components/dialog-group";

const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
  const { checkLogin, currentUser } = useCheckLogin();

  const [loaded, setLoaded] = useState(false);

  const waitingLogin = async () => {
    await checkLogin();
    setLoaded(true);
  };

  useEffect(() => {
    waitingLogin();
  }, [currentUser]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <DialogGroup />
      {children}
    </>
  );
};

export default GlobalProvider;
