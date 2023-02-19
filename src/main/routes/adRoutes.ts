import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { makeCreateAdController } from '@/main/factories/controllers/ad/createAdControllerFactory';
import { auth } from '@/main/middlewares/auth';
import { makeListAdsController } from '../factories/controllers/ad/listAdByAccountFactory';

export default (router: Router): void => {
  router.post('/ad', auth, adaptRoute(makeCreateAdController()));
  router.get('/ad', auth, adaptRoute(makeListAdsController()));
};
