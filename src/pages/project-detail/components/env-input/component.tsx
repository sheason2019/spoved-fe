import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { EnvPair } from "./types";

interface IEnvInput {
  envPairs: EnvPair[];
  setEnvPairs: Dispatch<SetStateAction<EnvPair[]>>;
}

export const EnvInput: FC<IEnvInput> = ({ envPairs, setEnvPairs }) => {
  const handleAddEnvPair = () => {
    setEnvPairs([...envPairs, { name: "", value: "" }]);
  };

  return (
    <>
      <Stack sx={{ mt: 1 }}>
        <Typography sx={{ flex: 1 }}>环境变量</Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {envPairs.map((envPair, index) => (
            <EnvPairRender
              index={index}
              envPair={envPair}
              setEnvPairs={setEnvPairs}
            />
          ))}
          <Button variant="outlined" onClick={handleAddEnvPair}>
            添加新的环境变量
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

interface IEnvPairRender {
  index: number;
  envPair: EnvPair;
  setEnvPairs: Dispatch<SetStateAction<EnvPair[]>>;
}

const EnvPairRender: FC<IEnvPairRender> = ({ index, envPair, setEnvPairs }) => {
  const handleOnChange: TextFieldProps["onChange"] = (e) => {
    setEnvPairs((prev) =>
      prev.map((envPair, i) => {
        if (i === index) {
          return { ...envPair, [e.target.name]: e.target.value };
        }
        return envPair;
      })
    );
  };

  const handleDelete = () => {
    setEnvPairs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack direction="row" alignItems="center">
      <TextField
        sx={{ flex: 2 }}
        value={envPair.name}
        onChange={handleOnChange}
        name="name"
        autoFocus
        size="small"
        placeholder="环境变量名称"
      />
      <Box sx={{ width: 16 }} />
      <TextField
        sx={{ flex: 3 }}
        value={envPair.value}
        onChange={handleOnChange}
        name="value"
        size="small"
        placeholder="环境变量值"
      />
      <IconButton sx={{ ml: 1 }} onClick={handleDelete}>
        <Delete />
      </IconButton>
    </Stack>
  );
};

export default EnvInput;
