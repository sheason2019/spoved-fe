import { useState } from "react";
import useDeployClient from "../../../../../common/hooks/use-client/use-deploy-client";
import { useDialog } from "../../../../../common/hooks/use-dialog";
import { useHeaderInput } from "../../header-input";
import useDeployDialog from "./use-deploy-dialog";

interface IForm {
  image: string;
  miniflow: boolean;
}

const DEFAULT_FORM: IForm = {
  image: "",
  miniflow: false,
};

const DEFAULT_ERR = {
  image: "",
  miniflow: "",
};

const useDeployForm = () => {
  const { client } = useDeployClient();
  const DialogApi = useDialog();

  const { handleClose, dialog } = useDeployDialog();

  const { headerPairs, setHeaderPairs } = useHeaderInput();

  // 表单内容及错误内容
  const [form, setForm] = useState<IForm>(DEFAULT_FORM);
  const [error, setError] = useState<Record<keyof IForm, string>>(DEFAULT_ERR);

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

    const [data, err] = await client.PostDeployOrder({
      compileOrder: dialog.compileOrder!,
      image: form.image,
      miniflow: form.miniflow,
      headerPairs: headerPairs,
    });
    if (err) {
      return DialogApi.error(err.message);
    }

    handleClose();
    DialogApi.success("创建部署工单成功" + JSON.stringify(data));
  };

  const handleReset = () => {
    setForm(DEFAULT_FORM);
  };

  // 表单校验
  const validate = () => {
    // CompileOrder不存在的情况走特殊通道
    if (!dialog.compileOrder) {
      throw DialogApi.error("无法获取到指定的CompileOrder，请刷新页面重试");
    }

    let allow = true;
    allow = validateImage() && allow;
    allow = validateHeader() && allow;

    return allow;
  };

  const validateImage = (): boolean => {
    if (!form.image) {
      handleError("image", "镜像不能为空");
    }
    return !!form.image;
  };

  const validateHeader = (): boolean => {
    // 非小流量部署下不进行header输入检测
    if (!form.miniflow) {
      return true;
    }
    // 小流量部署下至少指定一个header
    if (headerPairs.length === 0) {
      handleError("miniflow", "小流量部署模式下需要指定至少一个header");
      return false;
    } else {
      handleError("miniflow", "");
    }

    let allow = true;

    const set = new Set<string>();
    const validatedHeaderPairs = headerPairs.map((headerPair) => {
      const pair = { ...headerPair };
      // header和value都不能为空
      if (pair.header.length === 0 || pair.value.length === 0) {
        allow = false;
        pair.errText = "header和value的值都不能为空";
      }
      // 使用正则表达式对header进行校验
      const reg = /^[a-zA-z][0-9a-zA-Z\-_]+$/;
      if (!reg.test(pair.header)) {
        allow = false;
        pair.errText =
          "header必须以字母开头，且只能为数字、字母、下划线和-符号的组合";
      }
      // header定义不能重复
      if (set.has(pair.header)) {
        allow = false;
        pair.errText = "重复定义了header: " + pair.header;
      }
      set.add(pair.header);
      return pair;
    });

    setHeaderPairs(validatedHeaderPairs);

    return allow;
  };

  return {
    form,
    setForm,

    headerPairs,
    setHeaderPairs,

    error,
    setError,

    handleReset,
    handleInput,
    handleError,
    handleSubmit,

    validate,
    validateImage,
    validateHeader,
  };
};

export default useDeployForm;
