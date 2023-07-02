export namespace CreateUserAccount {
  export type Params = {
    name: string
    email: string
    password: string
    cityId: number
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateUserAccount {
  create(params: CreateUserAccount.Params): Promise<CreateUserAccount.Result>
}
