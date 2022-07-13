import { UpdateUserProfile } from '@/domain/usecases/user/IUpdateProfile';

export namespace UpdateUserProfileRepository {
  export type Params = UpdateUserProfile.Params
  export type Result = boolean
}

export interface IUpdateUserProfileRepository {
  update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result>
}
