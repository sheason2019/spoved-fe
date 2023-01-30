export interface GetUsernameRepeatPayload {
  name?: string;
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

export interface LoginResponse {
  token?: string;
}

export interface GetUsernameRepeatResponse {
  repeat?: boolean;
}
