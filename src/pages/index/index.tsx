import { FC, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import useCheckLogin from "./shared/hooks/use-check-login";

const IndexPage: FC = () => {
  const navigate = useNavigate();
  const { checkLogin, currentUser } = useCheckLogin();

  const loginGuard = async () => {
    const isLogin = await checkLogin();

    if (!isLogin) {
      navigate("/login");
    }
  };

  useEffect(() => {
    loginGuard();
  }, [currentUser]);

  return (
    <div>
      {[...new Array(200)].map((_, index) => (
        <div key={index}>INDEX PAGE</div>
      ))}
    </div>
  );
};

export default IndexPage;
