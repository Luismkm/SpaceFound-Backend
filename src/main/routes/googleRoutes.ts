import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { makeGoogleProviderController } from '@/main/factories/controllers/login/googleProviderControllerFactory';

export default (router: Router): void => {
  router.get('/auth/callback', adaptRoute(makeGoogleProviderController()));
};
