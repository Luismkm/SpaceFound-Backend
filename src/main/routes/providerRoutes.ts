import { Router } from 'express';
import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { auth } from '../middlewares/auth';
import { makeCreateProviderController } from '@/main/factories/controllers/provider/createProviderControllerFactory';
import { makeLoadProvidersController } from '@/main/factories/controllers/provider/loadProvidersControllerFactory';

export default (router: Router): void => {
  router.post('/provider', auth, adaptRoute(makeCreateProviderController()));
  router.get('/providers', adaptRoute(makeLoadProvidersController()));
};
