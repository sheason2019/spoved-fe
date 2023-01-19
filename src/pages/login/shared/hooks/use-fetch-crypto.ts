import { useEffect } from "react";
import useAccountClient from "../../../../common/hooks/use-account-client";

const useFetchCrypto = () => {
  const { accountClient } = useAccountClient();

  const fetchCrypto = async () => {
    const [res, err] = await accountClient.GetAccountCrypto();

    console.log(res, err);
  };
  useEffect(() => {
    fetchCrypto();
  }, []);
};

export default useFetchCrypto;
