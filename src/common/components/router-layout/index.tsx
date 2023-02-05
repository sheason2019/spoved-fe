import { FC } from "react";
import { Stack, Divider } from "@mui/material";
import Header from "./components/header";
import Scrollable from "../scrollable";
import { Outlet } from "react-router-dom";

const RouterLayout: FC = () => {
  return (
    <Stack sx={{ flex: 1, overflow: "hidden" }}>
      <Header />
      <Stack
        direction="row"
        alignItems="stretch"
        sx={{ flex: 1, overflow: "hidden" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Scrollable sx={{ flex: 1 }}>
          <Outlet />
        </Scrollable>
      </Stack>
    </Stack>
  );
};

export default RouterLayout;
