import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { makeCreateAdController } from '@/main/factories/controllers/ad/createAdControllerFactory';
import { auth } from '@/main/middlewares/auth';

export default (router: Router): void => {
  router.post('/ad', auth, adaptRoute(makeCreateAdController()));
};
