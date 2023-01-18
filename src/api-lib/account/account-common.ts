export interface AccountInfo {
  username?: string;
  password?: string;
  salt?: string;
}

export interface AccountCrypto {
  salt?: string;
  pubKey?: string;
}
