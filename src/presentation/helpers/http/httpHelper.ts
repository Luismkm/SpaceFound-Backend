import { ServerError } from '@/presentation/errors';
import { IHttpResponse } from '@/presentation/protocols';

export const success = (data: any):IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const serverError = (error: Error): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack),
});
