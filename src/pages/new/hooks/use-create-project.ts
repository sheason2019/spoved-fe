import { SelectProps, TextFieldProps } from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../../api-lib/project";
import useProjectClient from "../../../common/hooks/use-client/use-project-client";
import useCurrentUser from "../../../common/hooks/use-current-user";
import { useDialog } from "../../../common/hooks/use-dialog";

interface IProjectForm {
  owner: string;
  projName: string;
  gitUrl: string;
  describe: string;
}

const useCreateProject = () => {
  const DialogApi = useDialog();
  const { projectClient } = useProjectClient();
  const navigate = useNavigate();
  const { user } = useCurrentUser();
  const [form, setForm] = useState<IProjectForm>({
    owner: user?.username ?? "",
    projName: "",
    gitUrl: "",
    describe: "",
  });

  // 自动同步当前用户为form的owner
  useEffect(() => {
    setForm({ ...form, owner: user?.username ?? "" });
  }, [user]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const proj: Project = {
      projectName: form.projName,
      gitUrl: form.gitUrl,
      describe: form.describe,
    };

    const [data, err] = await projectClient.PostProject(proj);
    if (err) {
      return DialogApi.error(err.message);
    }

    return DialogApi.success({
      title: "创建成功",
      content: JSON.stringify(data),
      onOk() {
        navigate(`/${form.owner}/${form.projName}`);

        return true;
      },
    });
  };

  const handleChange: TextFieldProps["onChange"] = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelect: SelectProps["onChange"] = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return {
    form,
    setForm,

    handleChange,
    handleSelect,
    handleSubmit,
  };
};

export default useCreateProject;
