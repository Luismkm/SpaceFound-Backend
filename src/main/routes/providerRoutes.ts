import { Router } from 'express';
import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { auth } from '../middlewares/auth';
import { makeCreateProviderController } from '@/main/factories/controllers/provider/createProviderControllerFactory';
import { makeLoadProfileByIdController, makeLoadAllProvidersController } from '@/main/factories/controllers/provider/loadProvidersControllerFactory';

export default (router: Router): void => {
  router.post('/provider', auth, adaptRoute(makeCreateProviderController()));
  router.get('/providers', adaptRoute(makeLoadAllProvidersController()));
  router.get('/provider/:providerId/profile', adaptRoute(makeLoadProfileByIdController()));
};
