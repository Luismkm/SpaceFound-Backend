import { IController } from '@/presentation/protocols';
import { UpdateProfileController } from '@/presentation/controllers/user/UserProfileController';
import { makeUpdateProfileValidation } from './updateProfileValidationFactory';
import { makeDbUpdateUserProfile } from '../../usecases/user/dbUpdateUserProfileFactory';

export const makeUpdateProfileController = (): IController => {
  const controller = new UpdateProfileController(
    makeUpdateProfileValidation(),
    makeDbUpdateUserProfile(),
  );
  return controller;
};
