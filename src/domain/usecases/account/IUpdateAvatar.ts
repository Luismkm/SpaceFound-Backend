export namespace UpdateAvatar {
  export type Params = {
    userId:string,
    fileName: string
  }

  export type Result = string
}

export interface IUpdateAvatar {
  updateAvatar(account: UpdateAvatar.Params): Promise<UpdateAvatar.Result>
}
