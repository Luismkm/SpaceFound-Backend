import { Router } from 'express';
import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { makeSignUpController } from '../factories/controllers/login/signUp/signUpControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
};
