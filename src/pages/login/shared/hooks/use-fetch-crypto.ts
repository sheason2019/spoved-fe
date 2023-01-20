import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { AccountCrypto } from "../../../../api-lib/account";
import useAccountClient from "../../../../common/hooks/use-client/use-account-client";
import { useDialog } from "../../../../common/hooks/use-dialog";

export const cryptoAtom = atom<AccountCrypto | null>(null);

const useFetchCrypto = () => {
  const DialogApi = useDialog();
  const [crypto, setCrypto] = useAtom(cryptoAtom);
  const { accountClient } = useAccountClient();

  const fetchCrypto = async () => {
    const [data, err] = await accountClient.GetAccountCrypto();
    if (err) {
      DialogApi.error(err.message);
      return;
    }
    setCrypto(data);
  };
  useEffect(() => {
    fetchCrypto();
  }, []);

  return {
    crypto,
    setCrypto,
    fetchCrypto,
  };
};

export default useFetchCrypto;
