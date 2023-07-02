import { Router } from 'express';

import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { auth } from '@/main/middlewares/auth';
import { makeCreateRateController } from '@/main/factories/controllers/rate/createRateControllerFactory';

export default (router: Router): void => {
  router.post('/rate', auth, adaptRoute(makeCreateRateController()));
};
