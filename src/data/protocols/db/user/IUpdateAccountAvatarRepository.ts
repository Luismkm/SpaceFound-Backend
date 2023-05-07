export namespace UpdateAccountAvatarRepository {
  export type Params = {
    accountId: string
    filename: string
  }

  export type Result = boolean
}

export interface IUpdateAvatarRepository {
  updateAvatar(data: UpdateAccountAvatarRepository.Params): Promise<UpdateAccountAvatarRepository.Result>
}
