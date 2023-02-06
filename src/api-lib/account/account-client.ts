import axios, { AxiosInstance } from "axios";
import {
  GetUsernameRepeatResponse,
  GetUsernameRepeatPayload,
  GetSshPubKeyResponse,
  User,
  AccountInfo,
  AccountCrypto,
  LoginResponse,
} from ".";

interface ClientConfig {
  host?: string;
  ins?: AxiosInstance;
}
export class AccountApiClient {
  host: string;
  ins: AxiosInstance;

  constructor(config?: ClientConfig) {
    this.host = config?.host ?? "";
    this.ins = config?.ins ?? axios.create();
  }
  GetAccountCrypto() {
    return this.ins.get<AccountCrypto>(this.host + "/AccountApi.AccountCrypto");
  }
  Login(account: AccountInfo) {
    return this.ins.post<LoginResponse>(
      this.host + "/AccountApi.Login",
      account
    );
  }
  Regist(account: AccountInfo) {
    return this.ins.post<void>(this.host + "/AccountApi.Regist", account);
  }
  GetUsernameRepeat(payload: GetUsernameRepeatPayload) {
    return this.ins.get<GetUsernameRepeatResponse>(
      this.host + "/AccountApi.UsernameRepeat",
      { params: payload }
    );
  }
  GetCurrentUser() {
    return this.ins.get<User>(this.host + "/AccountApi.CurrentUser");
  }
  GetSshPubKey() {
    return this.ins.get<GetSshPubKeyResponse>(
      this.host + "/AccountApi.SshPubKey"
    );
  }
}
