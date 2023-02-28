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
import ErrText from "../../../new/components/err-text";
import { HeaderPair } from "./types";

interface IHeaderInput {
  headerPairs: HeaderPair[];
  setHeaderPairs: Dispatch<SetStateAction<HeaderPair[]>>;
  headerOnblur?: TextFieldProps["onBlur"];
}

export const EnvInput: FC<IHeaderInput> = ({
  headerPairs,
  setHeaderPairs,
  headerOnblur,
}) => {
  const handleAddEnvPair = () => {
    setEnvPairs([...envPairs, { name: "", value: "", errText: "" }]);
  };

  return (
    <>
      <Stack sx={{ mt: 1 }}>
        <Typography sx={{ flex: 1 }}>环境变量</Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {production && (
            <EnvPairRender
              envPair={{
                name: "PRODUCTION",
                value: "true",
                errText: "",
                readOnly: true,
              }}
            />
          )}
          {envPairs.map((envPair, index) => (
            <EnvPairRender
              key={index}
              index={index}
              envPair={envPair}
              setEnvPairs={setEnvPairs}
              nameOnblur={nameOnblur}
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
  index?: number;
  envPair: EnvPair;
  setEnvPairs?: Dispatch<SetStateAction<EnvPair[]>>;
  nameOnblur?: TextFieldProps["onBlur"];
}

const EnvPairRender: FC<IEnvPairRender> = ({
  index,
  envPair,
  setEnvPairs,
  nameOnblur,
}) => {
  const handleOnChange: TextFieldProps["onChange"] = (e) => {
    setEnvPairs &&
      setEnvPairs((prev) =>
        prev.map((envPair, i) => {
          if (i === index) {
            return { ...envPair, [e.target.name]: e.target.value, errText: "" };
          }
          return envPair;
        })
      );
  };

  const handleDelete = () => {
    setEnvPairs && setEnvPairs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <TextField
          sx={{ flex: 2 }}
          value={envPair.name}
          onChange={handleOnChange}
          disabled={envPair.readOnly}
          onBlur={nameOnblur}
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
          disabled={envPair.readOnly}
          name="value"
          size="small"
          placeholder="环境变量值"
        />
        {!envPair.readOnly && (
          <IconButton sx={{ ml: 1 }} onClick={handleDelete}>
            <Delete />
          </IconButton>
        )}
      </Stack>
      <ErrText value={envPair.errText} />
    </Stack>
  );
};

export default EnvInput;
