export type IHttpRequest = {
  headers?: any;
  body?: any;
  userId?: any;
  file?:{
    filename: any;
  }
}

export type IHttpResponse = {
  statusCode: number;
  body: any;
}
