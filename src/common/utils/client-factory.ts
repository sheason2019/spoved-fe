import { AxiosError, AxiosInstance } from "axios";

export type BaseFunction = (...args: any) => any;

export type Await<T extends Promise<any>> = T extends Promise<infer R>
  ? R
  : any;

interface RequestError {
  code: number;
  message: string;
}

interface BoxedRequest<T extends BaseFunction> {
  (...args: Parameters<T>): Promise<
    [Await<ReturnType<T>>["data"], null] | [null, RequestError]
  >;
}

type ClientProxy<T extends {}> = {
  [M in keyof T]: T[M] extends BaseFunction ? BoxedRequest<T[M]> : T[M];
} & {
  host: string;
  ins: AxiosInstance;
};

export function createClientProxy<T extends {}>(client: T): ClientProxy<T> {
  const clientProxy = new Proxy(client, {
    get(target, p: keyof T & (string | symbol), receiver) {
      const f = target[p] as BaseFunction;
      if (typeof f === "function") {
        return async (...args: any[]) => {
          try {
            const res = await f.apply(target, args);
            return [res.data, null];
          } catch (e: any) {
            const err: RequestError = {
              code: e.code ?? -1,
              message: "",
            };
            if (e instanceof AxiosError) {
              err.message = e.response?.data ?? "未知的请求错误";
            } else {
              err.message = e.message ?? "未知错误";
            }
            return [null, err];
          }
        };
      }
      return target[p];
    },
  });

  return clientProxy as ClientProxy<T>;
}
