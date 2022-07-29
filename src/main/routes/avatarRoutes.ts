import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@/main/config/upload';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { auth } from '@/main/middlewares/auth';
import { makeAvatarController } from '@/main/factories/controllers/account/avatarControllerFactory';

const upload = multer(uploadConfig.multer);

export default (router: Router): void => {
  router.patch('/avatar', auth, upload.single('avatar'), adaptRoute(makeAvatarController()));
};
