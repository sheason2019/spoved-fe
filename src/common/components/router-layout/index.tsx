import { FC, PropsWithChildren } from "react";
import { Stack, Divider } from "@mui/material";
import Header from "./components/header";
import Scrollable from "../scrollable";

const RouterLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Stack sx={{ flex: 1, overflow: "hidden" }}>
      <Header />
      <Stack
        direction="row"
        alignItems="stretch"
        sx={{ flex: 1, overflow: "hidden" }}
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Scrollable sx={{ flex: 1 }}>{children}</Scrollable>
      </Stack>
    </Stack>
  );
};

export default RouterLayout;
