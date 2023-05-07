import { AvatarController } from '@/presentation/controllers/user/AvatarController';
import { IController } from '@/presentation/protocols';
import { makeDbUpdateAvatar } from '@/main/factories/usecases/user/updateAvatarFactory';

export const makeUserAvatarController = (): IController => {
  const controller = new AvatarController(makeDbUpdateAvatar());
  return controller;
};
