import { useState } from "react";
import useDeployClient from "../../../../../common/hooks/use-client/use-deploy-client";
import { useDialog } from "../../../../../common/hooks/use-dialog";
import useDeployDialog from "./use-deploy-dialog";

interface IForm {
  image: string;
}

const DEFAULT_FORM: IForm = {
  image: "",
};

const DEFAULT_ERR = {
  image: "",
};

const useDeployForm = () => {
  const { client } = useDeployClient();
  const DialogApi = useDialog();

  const { handleClose, dialog } = useDeployDialog();

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

    return validateImage();
  };

  const validateImage = (): boolean => {
    if (!form.image) {
      handleError("image", "镜像不能为空");
    }
    return !!form.image;
  };

  return {
    form,
    setForm,

    error,
    setError,

    handleReset,
    handleInput,
    handleError,
    handleSubmit,

    validate,
    validateImage,
  };
};

export default useDeployForm;
