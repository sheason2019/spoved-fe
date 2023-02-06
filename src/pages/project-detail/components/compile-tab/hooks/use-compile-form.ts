import { useEffect, useState } from "react";
import useCompileClient from "../../../../../common/hooks/use-client/use-compile-client";
import { useDialog } from "../../../../../common/hooks/use-dialog";
import useProject from "../../../hooks/use-project";
import useCompileDialog from "./use-compile-dialog";

interface IForm {
  projectId: number;
  image: string;
  version: "Patch" | "Minor" | "Major";
  branch: string;
}

const DEFAULT_ERR = {
  projectId: "",
  image: "",
  version: "",
  branch: "",
};

const useCompileForm = () => {
  const { proj } = useProject();

  const { handleClose } = useCompileDialog();

  const { client } = useCompileClient();
  const DialogApi = useDialog();

  const [form, setForm] = useState<IForm>({
    projectId: proj.id ?? 0,
    image: "",
    version: "Patch",
    branch: "",
  });
  const [error, setError] = useState<Record<keyof IForm, string>>(DEFAULT_ERR);

  useEffect(() => {
    proj.id && handleInput("projectId", proj.id);
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

    const [data, err] = await client.PostCompile({
      ...form,
      branch: form.branch.length === 0 ? "master" : form.branch,
    });
    if (err) {
      return DialogApi.error(err.message);
    }

    handleClose();
    DialogApi.success("创建编译工单成功" + JSON.stringify(data));
  };

  const validate = () => {
    let allow = true;
    allow = validateImage() && allow;
    allow = validateVersion() && allow;

    return allow;
  };

  const validateImage = (): boolean => {
    if (!form.image) {
      handleError("image", "镜像不能为空");
    }
    return !!form.image;
  };
  const validateVersion = (): boolean => {
    if (!form.image) {
      handleError("version", "版本不能为空");
    }
    return !!form.version;
  };

  return {
    form,
    setForm,

    error,
    setError,

    handleInput,
    handleError,
    handleSubmit,

    validate,
    validateImage,
    validateVersion,
  };
};

export default useCompileForm;
