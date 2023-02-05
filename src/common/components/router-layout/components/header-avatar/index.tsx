import { Button, Avatar, Menu, MenuItem } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../../../hooks/use-current-user";
import LoginWrapper from "../../../login-wrapper";

const HeaderAvatar: FC = () => {
  const navigate = useNavigate();

  return (
    <LoginWrapper
      fallback={<Button onClick={() => navigate("/login")}>登录</Button>}
    >
      <AvatarControl />
    </LoginWrapper>
  );
};

const AvatarControl: FC = () => {
  const { user } = useCurrentUser();
  const [anchorEl, setAnchorEl] = useState<Element>();

  const navigate = useNavigate();

  return (
    <>
      <Avatar
        sx={{ cursor: "pointer" }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      />
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(undefined)}
        sx={{ mt: 1 }}
      >
        <MenuItem onClick={() => navigate(`/${user?.username}/profile`)}>
          设置
        </MenuItem>
      </Menu>
    </>
  );
};

export default HeaderAvatar;
