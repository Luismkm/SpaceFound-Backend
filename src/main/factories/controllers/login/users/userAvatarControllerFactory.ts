import { UserAvatarController } from '@/presentation/controllers/user/UserAvatarController';

import { IController } from '@/presentation/protocols';

import { makeDbUpdateAvatar } from '@/main/factories/usecases/user/dbUpdateAvatarFactory';

export const makeUserAvatarController = (): IController => {
  const controller = new UserAvatarController(makeDbUpdateAvatar());
  return controller;
};
