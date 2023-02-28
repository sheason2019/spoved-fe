import { useEffect, useState } from "react";
import useCompileClient from "../../../../../common/hooks/use-client/use-compile-client";
import { useDialog } from "../../../../../common/hooks/use-dialog";
import useProject from "../../../hooks/use-project";
import { useEnvInput } from "../../env-input";
import useCompileDialog from "./use-compile-dialog";
import useCompileOrders from "./use-compile-orders";

interface IForm {
  projectId: number;
  image: string;
  version: "Patch" | "Minor" | "Major";
  branch: string;
  production: boolean;
}

const DEFAULT_ERR = {
  projectId: "",
  image: "",
  version: "",
  branch: "",
  production: "",
};

const useCompileForm = () => {
  const { proj } = useProject();
  const { envPairs, setEnvPairs } = useEnvInput();

  const { handleClose } = useCompileDialog();
  const { fetchData } = useCompileOrders();

  const { client } = useCompileClient();
  const DialogApi = useDialog();

  const DEFAULT_FORM: IForm = {
    projectId: proj.id ?? 0,
    image: "",
    version: "Patch",
    branch: "",
    production: false,
  };

  // 表单内容及错误内容
  const [form, setForm] = useState<IForm>(DEFAULT_FORM);
  const [error, setError] = useState<Record<keyof IForm, string>>(DEFAULT_ERR);

  // Project发生变化时重置表单
  useEffect(() => {
    handleReset();
  }, [proj]);

  const handleInput = <F extends keyof IForm>(field: F, value: IForm[F]) => {
    handleError(field, "");
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleError = <F extends keyof IForm>(field: F, value: string) => {
    setError((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (!validate()) {
      return;
    }

    const env: Record<string, string> = {};
    envPairs.forEach((pair) => {
      env[pair.name] = pair.value;
    });

    const [data, err] = await client.PostCompileOrder({
      ...form,
      branch: form.branch.length === 0 ? "master" : form.branch,
      env: JSON.stringify(env),
    });
    if (err) {
      return DialogApi.error(err.message);
    }

    handleClose();
    DialogApi.success("创建编译工单成功" + JSON.stringify(data));
    fetchData();
  };

  const handleReset = () => {
    setForm(DEFAULT_FORM);
    setEnvPairs([]);
  };

  // 表单校验
  const validate = () => {
    setError(DEFAULT_ERR);
    let allow = true;
    allow = validateImage() && allow;
    allow = validateVersion() && allow;
    allow = validateEnvpair() && allow;

    return allow;
  };

  const validateImage = (): boolean => {
    if (!form.image) {
      handleError("image", "镜像不能为空");
    }
    return !!form.image;
  };
  const validateVersion = (): boolean => {
    if (!form.version) {
      handleError("version", "版本不能为空");
    }
    return !!form.version;
  };
  const validateEnvpair = (): boolean => {
    console.log('validate env pair')
    let allow = true;

    const set = new Set<string>();
    const validatedPairs = envPairs.map((item) => {
      // 重名校验
      if (set.has(item.name)) {
        allow = false;
        return { ...item, errText: "重复定义了同一个环境变量" };
      }
      set.add(item.name);
      // 正则校验
      if (!/^[a-zA-z][_0-9a-zA-Z]+$/.test(item.name)) {
        allow = false;
        return {
          ...item,
          errText: "环境变量名必须以字母开头，且只能为字母和数字的组合",
        };
      }
      // 对PRODUCTION变量进行特殊处理
      if (item.name === "PRODUCTION") {
        allow = false;
        return {
          ...item,
          errText:
            "PRODUCTION变量为预留变量，无法直接声明，请调整编译环境变量以修改该变量的值",
        };
      }
      return item;
    });

    setEnvPairs(validatedPairs);

    return allow;
  };

  return {
    form,
    setForm,

    error,
    setError,

    envPairs,
    setEnvPairs,

    handleReset,
    handleInput,
    handleError,
    handleSubmit,

    validate,
    validateImage,
    validateVersion,
    validateEnvpair,
  };
};

export default useCompileForm;
