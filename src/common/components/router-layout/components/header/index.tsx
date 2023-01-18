import { Toolbar, Avatar, Box } from "@mui/material";
import { FC } from "react";
import HeaderTitle from "../header-title";

const Header: FC = () => {
  return (
    <Toolbar sx={{ background: "rgb(36,41,47)" }}>
      <HeaderTitle />
      <Box sx={{ flex: 1 }} />
      <Avatar />
    </Toolbar>
  );
};

export default Header;
