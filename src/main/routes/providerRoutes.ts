import { Router } from 'express';

import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { auth } from '../middlewares/auth';
import { makeCreateProviderController } from '../factories/controllers/provider/createProviderControllerFactory';

export default (router: Router): void => {
  router.post('/provider', auth, adaptRoute(makeCreateProviderController()));
};
