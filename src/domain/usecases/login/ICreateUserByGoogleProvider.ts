export namespace CreateUserByGoogleProvider {
  export type Params = {
    name: string
    email: string
    avatar: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateUserByGoogleProvider {
  create(params: CreateUserByGoogleProvider.Params): Promise<CreateUserByGoogleProvider.Result>
}
