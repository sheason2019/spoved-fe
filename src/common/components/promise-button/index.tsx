import { LoadingButton, LoadingButtonProps } from "@mui/lab";
import { FC, useState } from "react";

const PromiseButton: FC<LoadingButtonProps> = (props) => {
  const [loading, setLoading] = useState(false);

  const handleClick: LoadingButtonProps["onClick"] = async (e) => {
    setLoading(true);
    try {
      props.onClick && (await props.onClick(e));
    } catch (e) {
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return <LoadingButton loading={loading} {...props} onClick={handleClick} />;
};

export default PromiseButton;
