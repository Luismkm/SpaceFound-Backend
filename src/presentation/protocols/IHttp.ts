export type IHttpRequest = {
  headers?: any;
  body?: any;
  userId?: any;
  accountId?: any;
  params?: any;
  filename?: any;
}

export type IHttpResponse = {
  statusCode: number;
  body: any;
}
