import { AvatarController } from '@/presentation/controllers/user/AvatarController';
import { IController } from '@/presentation/protocols';
import { makeDbUpdateAvatar } from '../../usecases/user/updateAvatarFactory';

export const makeAvatarController = (): IController => {
  const controller = new AvatarController(makeDbUpdateAvatar());
  return controller;
};