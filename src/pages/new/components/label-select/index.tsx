import { Select, SelectProps, Stack, TextField, Typography } from "@mui/material";
import { FC } from "react";

type ILabelText = SelectProps & {
  label: string;
  labelWidth: number;
};

const LabelSelect: FC<ILabelText> = ({ label, labelWidth, ...props }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography sx={{ width: labelWidth }}>{label}</Typography>
      <Select size="small" {...props} />
    </Stack>
  );
};

export default LabelSelect;
