import { AvatarController } from '@/presentation/controllers/account/AvatarController';
import { IController } from '@/presentation/protocols';
import { makeDbUpdateAvatar } from '../../usecases/user/updateAvatarFactory';

export const makeUserAvatarController = (): IController => {
  const controller = new AvatarController(makeDbUpdateAvatar());
  return controller;
};
