import { Toolbar, Avatar, Box, Button } from "@mui/material";
import { FC } from "react";
import HeaderAvatar from "../header-avatar";
import HeaderTitle from "../header-title";

const Header: FC = () => {
  

  return (
    <Toolbar sx={{ background: "rgb(36,41,47)" }}>
      <HeaderTitle />
      <Box sx={{ flex: 1 }} />
      <HeaderAvatar />
    </Toolbar>
  );
};

export default Header;
