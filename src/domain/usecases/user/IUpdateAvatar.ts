export namespace UpdateAvatar {
  export type Params = {
    userId: string,
    fileName: string
  }

  export type Result = string
}

export interface IUpdateAvatar {
  updateAvatar({ userId, fileName }: UpdateAvatar.Params): Promise <UpdateAvatar.Result>
}
