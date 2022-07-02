export namespace UpdateUserProfileRepository {
  export type Params = {
    userId: string;
    name: string;
    email: string;
  }

  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
  }
}

export interface IUpdateProfile {
  update(user: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result>
}