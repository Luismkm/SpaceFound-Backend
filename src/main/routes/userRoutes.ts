import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { adaptRoute } from '../adapter/express/expressRouterAdapter';
import { auth } from '../middlewares/auth';
import { makeUserAvatarController } from '../factories/controllers/user/userAvatarControllerFactory';

const upload = multer(uploadConfig.multer);

export default (router: Router): void => {
  router.patch('/avatar', auth, upload.single('avatar'), adaptRoute(makeUserAvatarController()));
};
