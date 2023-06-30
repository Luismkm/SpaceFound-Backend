export namespace GoogleAuthentication {
  export type Params = {
    email: string
  }

  export type Result = {
    accessToken: string
  }
}

export interface IGoogleAuthentication {
  auth(params: GoogleAuthentication.Params): Promise<GoogleAuthentication.Result>
}
