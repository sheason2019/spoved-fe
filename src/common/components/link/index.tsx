import { FC } from "react";
import { Box, BoxProps } from "@mui/material";

const Link: FC<BoxProps> = (props) => {
  return (
    <Box
      component="a"
      {...props}
      sx={{
        color: "rgb(22,93,255)",
        cursor: "pointer",
        px: 0.65,
        py: 0.35,
        transition: '250ms all',
        borderRadius: 1,
        userSelect: "none",
        "&:hover": {
          background: "rgba(0,0,0, 0.08)",
        },
        "&:active": {
          background: "rgba(0,0,0, 0.15)",
        },
        ...props.sx,
      }}
    />
  );
};

export default Link;
