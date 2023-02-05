export interface LoginResponse {
  token?: string;
}

export interface GetUsernameRepeatResponse {
  repeat?: boolean;
}

export interface GetUsernameRepeatPayload {
  name?: string;
}

export interface GetSshPubKeyResponse {
  pubKey?: string;
}

export interface User {
  username?: string;
}

export interface AccountInfo {
  username?: string;
  password?: string;
  salt?: string;
}

export interface AccountCrypto {
  salt?: string;
  pubKey?: string;
}
