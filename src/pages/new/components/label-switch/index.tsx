import { Box, Stack, Switch, SwitchProps, Typography } from "@mui/material";
import { FC } from "react";
import ErrText from "../err-text";

type ILabelText = SwitchProps & {
  label: string;
  labelWidth: number;
  errText?: string;
};

const LabelSwitch: FC<ILabelText> = ({
  label,
  labelWidth,
  errText,
  ...props
}) => {
  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ width: labelWidth }}>{label}</Typography>
        <Switch size="small" {...props} />
      </Stack>
      <ErrText value={errText} />
    </Box>
  );
};

export default LabelSwitch;
