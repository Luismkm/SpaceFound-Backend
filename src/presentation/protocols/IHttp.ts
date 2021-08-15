export type IHttpRequest = {
  headers?: any;
  body?: any;
  userId?: any;
  params?: any;
  file?:{
    filename: any;
  }
}

export type IHttpResponse = {
  statusCode: number;
  body: any;
}
