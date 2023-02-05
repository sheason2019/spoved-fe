import { FC, PropsWithChildren, ReactNode } from "react";
import useCurrentUser from "../../hooks/use-current-user";

interface IProps extends PropsWithChildren {
  fallback?: ReactNode;
}

const LoginWrapper: FC<IProps> = ({ children, fallback }) => {
  const { user } = useCurrentUser();

  if (user) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  return null;
};

export default LoginWrapper;
