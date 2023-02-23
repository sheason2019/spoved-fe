import { Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

interface IProps {
  value?: string;
}

export const ErrText: FC<IProps> = ({ value }) => {
  if (!value) {
    return null;
  }

  return (
    <Typography
      sx={{ color: "red", fontSize: "0.75rem", textAlign: "right", mt: 0.25 }}
    >
      {value}
    </Typography>
  );
};

export default ErrText;
