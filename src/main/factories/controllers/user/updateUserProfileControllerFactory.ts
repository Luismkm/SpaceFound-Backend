import { IController } from '@/presentation/protocols';
import { UpdateProfileController } from '@/presentation/controllers/user/UpdateUserProfileController';
import { makeUpdateProfileValidation } from '@/main/factories/controllers/user/updateProfileValidationFactory';
import { makeDbUpdateUserProfile } from '@/main/factories/usecases/user/updateUserProfileFactory';

export const makeUpdateProfileController = (): IController => {
  const controller = new UpdateProfileController(
    makeUpdateProfileValidation(),
    makeDbUpdateUserProfile(),
  );
  return controller;
};
