import { FC } from "react";
import { List, ListItem } from "@mui/material";

const RouterList: FC = () => {
  return (
    <List sx={{ width: 280 }}>
      {[...new Array(200)].map((_, index) => (
        <ListItem key={index}>Item {index}</ListItem>
      ))}
    </List>
  );
};

export default RouterList;
