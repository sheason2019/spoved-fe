import { Box } from "@mui/material";
import { FC } from "react";

interface IProps {
  text: string;
}

const ErrorText: FC<IProps> = ({ text }) => {
  if (!text) {
    return null;
  }

  return (
    <Box component="span" sx={{ color: "red" }}>
      {text}
    </Box>
  );
};

export default ErrorText;
