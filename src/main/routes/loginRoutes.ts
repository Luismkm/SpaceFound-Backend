import { Router } from 'express';
import { adaptRoute } from '../adapter/express/expressRouterAdapter';

import { makeLoginController } from '../factories/controllers/login/login/loginControllerFactory';
import { makeSignUpController } from '../factories/controllers/login/signUp/signUpControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
