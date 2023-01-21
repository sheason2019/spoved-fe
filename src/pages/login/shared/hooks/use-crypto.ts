import { atom, useAtom } from "jotai";
import JSEncrypt from "jsencrypt";
import { AccountCrypto } from "../../../../api-lib/account";
import useAccountClient from "../../../../common/hooks/use-client/use-account-client";
import { useDialog } from "../../../../common/hooks/use-dialog";

export const cryptoAtom = atom<AccountCrypto | null>(null);

const useCrypto = () => {
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

  const encryptString = (content: string): string => {
    if (!crypto?.pubKey) {
      throw DialogApi.error("加密程序尚未初始化");
    }

    const encrypter = new JSEncrypt();
    encrypter.setPublicKey(crypto.pubKey);
    const cipherText = encrypter.encrypt(content);

    if (!cipherText) {
      throw DialogApi.error("加密逻辑执行失败");
    }
    return cipherText;
  };

  return {
    crypto,
    setCrypto,
    fetchCrypto,

    encryptString,
  };
};

export default useCrypto;
