import { AvatarController } from '@/presentation/controllers/provider/AvatarController';
import { IController } from '@/presentation/protocols';
import { makeDbUpdateAvatar } from '../../usecases/user/updateAvatarFactory';

export const makeProviderAvatarController = (): IController => {
  const controller = new AvatarController(makeDbUpdateAvatar());
  return controller;
};
