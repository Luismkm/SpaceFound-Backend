export namespace UpdateUserAvatarRepository {
  export type Params = {
    userId: string
    fileName: string
  }

  export type Result = boolean
}

export interface IUpdateAvatarRepository {
  updateAvatar(data: UpdateUserAvatarRepository.Params): Promise<UpdateUserAvatarRepository.Result>
}
