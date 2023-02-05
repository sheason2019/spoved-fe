import { useState } from "react";
import { useAccountClient } from "../../../common/hooks/use-client";

const useSshPubKey = () => {
  const { accountClient } = useAccountClient();

  const [loading, setLoading] = useState(true);
  const [pubkey, setPubkey] = useState("");

  const fetchSshPubKey = async () => {
    setLoading(true);
    const [data, err] = await accountClient.GetSshPubKey();
    if (err) {
      throw err;
    }
    setLoading(false);
    setPubkey(data.pubKey!);
  };

  return {
    loading,
    pubkey,
    fetchSshPubKey,
  };
};

export default useSshPubKey;
