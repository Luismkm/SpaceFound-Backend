import { UpdateUserProfileRepository } from '@/domain/usecases/user/IUpdateProfile';

export interface IUpdateUserProfileRepository {
  update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result>
}
