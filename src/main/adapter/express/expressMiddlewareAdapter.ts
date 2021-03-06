import { NextFunction, Request, Response } from 'express';

import { IHttpRequest, IMiddleware } from '@/presentation/protocols';

export const adaptMiddleware = (middleware: IMiddleware) => (
  (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
    };

    const httpResponse = middleware.handle(httpRequest);
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
      });
    }
  }
);
