export namespace UpdateUserProfileRepository {
  export type Params = {
    userId: string
    name: string
    email: string
    cityId: number
  }
  export type Result = boolean
}

export interface IUpdateUserProfileRepository {
  update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result>
}
