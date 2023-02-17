export namespace UpdateAvatar {
  export type Params = {
    userId:string,
    fileName: string
  }

  export type Result = boolean
}

export interface IUpdateAvatar {
  updateAvatar(params: UpdateAvatar.Params): Promise<UpdateAvatar.Result>
}
