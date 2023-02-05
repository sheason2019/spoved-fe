import { Box, Skeleton, Typography } from "@mui/material";
import { FC, useEffect } from "react";
import useSshPubKey from "./use-ssh-pub-key";

const SshPubKey: FC = () => {
  const { loading, pubkey, fetchSshPubKey } = useSshPubKey();

  useEffect(() => {
    fetchSshPubKey();
  }, []);

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">SSH 公钥：</Typography>
      <Box sx={{ background: "lightgray", p: 2, borderRadius: 2 }}>
        {loading ? (
          [...new Array(5)].map((_, index) => <Skeleton key={index} />)
        ) : (
          <Typography sx={{ wordBreak: "break-all" }} variant="body1">
            {pubkey}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default SshPubKey;
