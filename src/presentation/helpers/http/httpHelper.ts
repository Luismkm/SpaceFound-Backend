import { ServerError } from '@/presentation/errors';
import { UnauthorizedError } from '@/presentation/errors/UnauthorizedError';

import { IHttpResponse } from '@/presentation/protocols';

export const ok = (data: any):IHttpResponse => ({
  statusCode: 200,
  body: data,
});

export const badRequest = (error: Error):IHttpResponse => ({
  statusCode: 400,
  body: error,
});

export const unauthorized = ():IHttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError(),
});

export const forbidden = (error: Error): IHttpResponse => ({
  statusCode: 403,
  body: error,
});

export const serverError = (error: unknown): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(error instanceof Error ? error.stack : undefined),
});

export const noContent = (): IHttpResponse => ({
  statusCode: 204,
  body: null,
});
