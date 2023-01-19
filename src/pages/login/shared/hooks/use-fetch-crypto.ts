import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { AccountCrypto } from "../../../../api-lib/account";
import useAccountClient from "../../../../common/hooks/use-account-client";

export const cryptoAtom = atom<AccountCrypto | null>(null);

const useFetchCrypto = () => {
  const [crypto, setCrypto] = useAtom(cryptoAtom);
  const { accountClient } = useAccountClient();

  const fetchCrypto = async () => {
    const [data, err] = await accountClient.GetAccountCrypto();
    if (err) {
      return;
    }
    setCrypto(data);
  };
  useEffect(() => {
    fetchCrypto();
  }, []);
};

export default useFetchCrypto;
