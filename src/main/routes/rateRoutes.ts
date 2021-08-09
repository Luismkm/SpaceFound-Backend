import { Router } from 'express';

import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { auth } from '../middlewares/auth';
import { makeCreateRateController } from '../factories/controllers/rate/createRateControllerFactory';

export default (router: Router): void => {
  router.post('/rate', auth, adaptRoute(makeCreateRateController()));
};
