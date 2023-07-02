export type IHttpRequest = {
  headers?: any;
  body?: any;
  accountId?: any;
  accountType?:any;
  params?: any;
  filename?: any;
}

export type IHttpResponse = {
  statusCode: number;
  body: any;
}
