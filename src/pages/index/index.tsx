import { FC } from "react";
import useCheckLogin from "./hooks/use-check-login";

const IndexPage: FC = () => {
  useCheckLogin();

  return (
    <div>
      {[...new Array(200)].map((_, index) => (
        <div key={index}>INDEX PAGE</div>
      ))}
    </div>
  );
};

export default IndexPage;
