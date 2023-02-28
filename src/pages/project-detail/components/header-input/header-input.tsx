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

export const HeaderInput: FC<IHeaderInput> = ({
  headerPairs,
  setHeaderPairs,
  headerOnblur,
}) => {
  const handleAddEnvPair = () => {
    setHeaderPairs([...headerPairs, { header: "", value: "", errText: "" }]);
  };

  return (
    <>
      <Stack sx={{ mt: 1 }}>
        <Typography sx={{ flex: 1 }}>小流量Header信息</Typography>
        <Stack spacing={1} sx={{ mt: 1 }}>
          {headerPairs.map((headerPair, index) => (
            <HeaderPairRender
              key={index}
              index={index}
              headerPair={headerPair}
              setHeaderPairs={setHeaderPairs}
              headerOnblur={headerOnblur}
            />
          ))}
          <Button variant="outlined" onClick={handleAddEnvPair}>
            添加新的Header匹配
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

interface IHeaderPairRender {
  index?: number;
  headerPair: HeaderPair;
  setHeaderPairs?: Dispatch<SetStateAction<HeaderPair[]>>;
  headerOnblur?: TextFieldProps["onBlur"];
}

const HeaderPairRender: FC<IHeaderPairRender> = ({
  index,
  headerPair,
  setHeaderPairs,
  headerOnblur,
}) => {
  const handleOnChange: TextFieldProps["onChange"] = (e) => {
    setHeaderPairs &&
      setHeaderPairs((prev) =>
        prev.map((headPair, i) => {
          if (i === index) {
            return {
              ...headPair,
              [e.target.name]: e.target.value,
              errText: "",
            };
          }
          return headPair;
        })
      );
  };

  const handleDelete = () => {
    setHeaderPairs &&
      setHeaderPairs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center">
        <TextField
          sx={{ flex: 2 }}
          value={headerPair.header}
          onChange={handleOnChange}
          onBlur={headerOnblur}
          name="header"
          autoFocus
          size="small"
          placeholder="Header名称"
        />
        <Box sx={{ width: 16 }} />
        <TextField
          sx={{ flex: 3 }}
          value={headerPair.value}
          onChange={handleOnChange}
          name="value"
          size="small"
          placeholder="Header值"
        />
        <IconButton sx={{ ml: 1 }} onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Stack>
      <ErrText value={headerPair.errText} />
    </Stack>
  );
};

export default HeaderInput;
