import axios, { AxiosInstance } from "axios";
import {
  AccountCrypto,
  LoginResponse,
  GetUsernameRepeatResponse,
  GetUsernameRepeatPayload,
  User,
  AccountInfo,
} from ".";

interface ClientConfig {
  host?: string;
  ins?: AxiosInstance;
}
export class AccountServiceClient {
  host: string;
  ins: AxiosInstance;

  constructor(config?: ClientConfig) {
    this.host = config?.host ?? "";
    this.ins = config?.ins ?? axios.create();
  }
  GetAccountCrypto() {
    return this.ins.get<AccountCrypto>(
      this.host + "/AccountService.AccountCrypto"
    );
  }
  Login(account: AccountInfo) {
    return this.ins.post<LoginResponse>(
      this.host + "/AccountService.Login",
      account
    );
  }
  Regist(account: AccountInfo) {
    return this.ins.post<void>(this.host + "/AccountService.Regist", account);
  }
  GetUsernameRepeat(payload: GetUsernameRepeatPayload) {
    return this.ins.get<GetUsernameRepeatResponse>(
      this.host + "/AccountService.UsernameRepeat",
      { params: payload }
    );
  }
  GetCurrentUser() {
    return this.ins.get<User>(this.host + "/AccountService.CurrentUser");
  }
}
