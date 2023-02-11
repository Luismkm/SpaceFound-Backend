import { Router } from 'express';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { makeSignUpController } from '@/main/factories/controllers/user/signUpControllerFactory';
import { makeLoginController } from '@/main/factories/controllers/user/loginControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
