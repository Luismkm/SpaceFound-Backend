import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { makeSignUpController } from '@/main/factories/controllers/account/signUpControllerFactory';
import { makeLoginController } from '@/main/factories/controllers/account/loginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
