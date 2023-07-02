import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@/main/config/upload';
import { adaptRoute } from '@/main/adapter/express/expressRouterAdapter';
import { auth } from '@/main/middlewares/auth';
import { makeUserAvatarController } from '@/main/factories/controllers/user/avatarControllerFactory';
import { makeProviderAvatarController } from '@/main/factories/controllers/provider/avatarControllerFactory';

const upload = multer(uploadConfig.multer);

export default (router: Router): void => {
  router.patch('/avatar', auth, upload.single('avatar'), adaptRoute(makeUserAvatarController()));
  router.patch('/avatar/provider', auth, upload.single('avatar'), adaptRoute(makeProviderAvatarController()));
};
