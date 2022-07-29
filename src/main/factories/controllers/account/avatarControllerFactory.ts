import { AvatarController } from '@/presentation/controllers/account/AvatarController';
import { IController } from '@/presentation/protocols';
import { makeDbUpdateAvatar } from '@/main/factories/usecases/account/updateAvatarFactory';

export const makeAvatarController = (): IController => {
  const controller = new AvatarController(makeDbUpdateAvatar());
  return controller;
};
