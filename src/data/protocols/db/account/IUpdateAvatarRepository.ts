export namespace UpdateAvatarRepository {
  export type Params = {
    userId: string
    fileName: string
  }

  export type Result = string
}

export interface IUpdateAvatarRepository {
  updateAvatar(data: UpdateAvatarRepository.Params): Promise<UpdateAvatarRepository.Result>
}
