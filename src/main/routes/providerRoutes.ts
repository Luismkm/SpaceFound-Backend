import { Router } from 'express';

import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { auth } from '../middlewares/auth';
import { makeCreateProviderController } from '../factories/controllers/provider/createProvider/createProviderControllerFactory';
import { makeLoadProvidersController } from '../factories/controllers/provider/loadProvider/loadProvidersControllerFactory';

export default (router: Router): void => {
  router.post('/provider', auth, adaptRoute(makeCreateProviderController()));
  router.get('/providers', adaptRoute(makeLoadProvidersController()));
};
