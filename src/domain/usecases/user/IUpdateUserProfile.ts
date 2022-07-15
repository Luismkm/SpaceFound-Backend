export namespace UpdateUserProfile {
  export type Params = {
    userId: string;
    name: string;
    email: string;
  }

  export type Result = boolean
}

export interface IUpdateUserProfile {
  update(user: UpdateUserProfile.Params): Promise<UpdateUserProfile.Result>
}
