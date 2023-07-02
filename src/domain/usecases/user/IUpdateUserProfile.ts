export namespace UpdateUserProfile {
  export type Params = {
    accountId: string
    name: string
    email: string
    cityId: number
  }

  export type Result = boolean
}

export interface IUpdateUserProfile {
  update(params: UpdateUserProfile.Params): Promise<UpdateUserProfile.Result>
}
