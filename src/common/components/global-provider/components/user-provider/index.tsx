import { FC, useEffect } from "react";
import useCurrentUser from "../../../../hooks/use-current-user";

// 提供用户信息
const UserProvider: FC = () => {
  const {} = useCurrentUser();

  useEffect(() => {}, []);

  return null;
};

export default UserProvider;