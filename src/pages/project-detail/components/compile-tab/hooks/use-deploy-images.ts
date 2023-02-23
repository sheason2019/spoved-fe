import { useState } from "react";
import useDeployClient from "../../../../../common/hooks/use-client/use-deploy-client";
import { useDialog } from "../../../../../common/hooks/use-dialog";

export const useDeployImages = () => {
  const DialogApi = useDialog();
  const { client } = useDeployClient();

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
    setImages,

    fetchImages,
  };
};

export default useDeployImages;
