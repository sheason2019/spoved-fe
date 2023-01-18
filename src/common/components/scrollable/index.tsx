import { Stack, StackProps } from "@mui/material";
import { FC } from "react";

const Scrollable: FC<StackProps> = (props) => {
  return <Stack {...props} sx={{ overflow: "auto", ...props.sx }} />;
};

export default Scrollable;
