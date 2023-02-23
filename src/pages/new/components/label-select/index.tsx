import { Box, Select, SelectProps, Stack, Typography } from "@mui/material";
import { FC } from "react";
import ErrText from "../err-text";

type ILabelText = SelectProps & {
  label: string;
  labelWidth: number;
  errText?: string;
};

const LabelSelect: FC<ILabelText> = ({
  label,
  labelWidth,
  errText,
  ...props
}) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ width: labelWidth }}>{label}</Typography>
        <Select size="small" {...props} />
      </Stack>
      <ErrText value={errText} />
    </Box>
  );
};

export default LabelSelect;
