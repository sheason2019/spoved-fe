import { SelectProps, TextFieldProps } from "@mui/material";
import { FormEventHandler, useState } from "react";

interface IProjectForm {
  projName: string;
  gitUrl: string;
  describe: string;

  imageBuild: string;
  imagePublish: string;
}

const useCreateProject = () => {
  const [form, setForm] = useState<IProjectForm>({
    projName: "",
    gitUrl: "",
    describe: "",
    imageBuild: "",
    imagePublish: "",
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
