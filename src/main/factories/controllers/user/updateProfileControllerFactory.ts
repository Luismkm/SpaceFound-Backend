import { IController } from '@/presentation/protocols';
import { UpdateProfileController } from '@/presentation/controllers/user/UserProfileController';
import { makeUpdateProfileValidation } from './updateProfileValidationFactory';
import { makeDbUpdateProfile } from '../../usecases/user/dbUpdateProfileFactory';

export const makeUpdateProfileController = (): IController => {
  const controller = new UpdateProfileController(
    makeUpdateProfileValidation(),
    makeDbUpdateProfile(),
  );
  return controller;
};
