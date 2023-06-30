export namespace LoadGoogleUser {
  export type Params = {
    code: string
  };

  export type Result = undefined | {
    id: string
    email: string
    name: string
    verified_email: boolean
    picture: string
  };
}

export interface ILoadGoogleUser {
  loadUser: (params: LoadGoogleUser.Params) => Promise<LoadGoogleUser.Result>
}
