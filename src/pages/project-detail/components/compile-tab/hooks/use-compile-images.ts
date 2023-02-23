import { useState } from "react";
import useCompileClient from "../../../../../common/hooks/use-client/use-compile-client";
import { useDialog } from "../../../../../common/hooks/use-dialog";

const useCompileImages = () => {
  const { client } = useCompileClient();

  const DialogApi = useDialog();

  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    const [data, err] = await client.GetOptionalImages();

    if (err) {
      return DialogApi.error(err.message);
    }

    setImages(data.images ?? []);
  };

  return {
    images,
    fetchImages,
  }
};

export default useCompileImages;
