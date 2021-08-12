import { UserAvatarController } from '@/presentation/controllers/user/UserAvatarController';
import { makeDbUpdateAvatar } from '@/main/factories/usecases/user/dbUpdateAvatarFactory';

import { IController } from '@/presentation/protocols';

export const makeUserAvatarController = (): IController => {
  const controller = new UserAvatarController(makeDbUpdateAvatar());
  return controller;
};
