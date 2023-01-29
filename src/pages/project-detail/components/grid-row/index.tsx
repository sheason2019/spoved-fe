import { Grid, Typography } from "@mui/material";
import { FC, ReactNode } from "react";

interface IGridRow {
  label: string;
  content: ReactNode;
}

const GridRow: FC<IGridRow> = ({ label, content }) => {
  return (
    <Grid item container xs={12}>
      <Grid item width={100} sx={{ fontWeight: "bold" }}>
        {label}
      </Grid>
      <Grid item flex={1}>
        <Typography>{content}</Typography>
      </Grid>
    </Grid>
  );
};

export default GridRow;
