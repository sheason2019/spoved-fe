import { Stack, TextField, TextFieldProps, Typography } from "@mui/material";
import { FC } from "react";

type ILabelText = TextFieldProps & {
  label: string;
  labelWidth: number;
};

const LabelText: FC<ILabelText> = ({ label, labelWidth, ...props }) => {
  return (
    <Stack direction="row" alignItems="center">
      <Typography sx={{ width: labelWidth }}>{label}</Typography>
      <TextField size="small" {...props} />
    </Stack>
  );
};

export default LabelText;
