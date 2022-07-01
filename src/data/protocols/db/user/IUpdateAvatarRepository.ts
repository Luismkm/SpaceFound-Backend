export namespace UpdateAvatarRepository {
  export type Result = { avatar: string }
}

export interface IUpdateAvatarRepository {
  updateAvatar(userId: string, fileName: string): Promise<UpdateAvatarRepository.Result>
}
