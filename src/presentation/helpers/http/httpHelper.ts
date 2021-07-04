import { ServerError } from '@/presentation/errors';
import { IHttpResponse } from '@/presentation/protocols';

export const success = (data: any):IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const badRequest = (error: Error):IHttpResponse => ({
  statusCode: 400,
  body: error,
});

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
