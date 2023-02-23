import {
  Box,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { FC } from "react";
import ErrText from "../err-text";

type ILabelText = TextFieldProps & {
  label: string;
  labelWidth: number;
  errText?: string;
};

const LabelText: FC<ILabelText> = ({
  label,
  labelWidth,
  errText,
  ...props
}) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center">
        <Typography sx={{ width: labelWidth }}>{label}</Typography>
        <TextField
          size="small"
          helperText={
            errText && (
              <Box component="span" sx={{ color: "red" }}>
                {errText}
              </Box>
            )
          }
          {...props}
        />
      </Stack>
      <ErrText value={errText} />
    </Box>
  );
};

export default LabelText;
