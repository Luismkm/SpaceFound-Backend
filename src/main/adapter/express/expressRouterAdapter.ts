import { Request, Response } from 'express';
import { IController } from '@/presentation/protocols';

export const adaptRoute = (controller: IController) => async (req: Request, res: Response) => {
  const request = {
    ...(req.body || {}),
    ...(req.params || {}),
    ...(req.file || {}),
    accountId: req.accountId,
    accountType: req.accountType,
  };
  const httpResponse = await controller.handle(request);
  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  }
};
