import { useState } from "react";

export enum AccountFormStatus {
  Inputing = 'primary',
  Posting = 'inherit',
  Success = 'success',
}

const useAccountFormStatus = () => {
  const [status, setStatus] = useState<AccountFormStatus>(
    AccountFormStatus.Inputing
  );

  return { status, setStatus };
};

export default useAccountFormStatus;
