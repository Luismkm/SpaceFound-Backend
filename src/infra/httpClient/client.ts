export namespace HttpPostClient {
  export type Params = {
    url: string
    data: string
    headers: object
  };
}

export interface HttpPostClient {
  post: <T = any>(params: HttpPostClient.Params) => Promise<T>
}

export namespace HttpGetClient {
  export type Params = {
    url: string
    headers: object
  };
}

export interface HttpGetClient {
  get: <T = any>(params: HttpGetClient.Params) => Promise<T>
}
