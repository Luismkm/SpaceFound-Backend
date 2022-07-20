export namespace CreateAccount {
  export type Params = {
    name: string
    email: string
    password: string
    cityId: number
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAccount {
  create(params: CreateAccount.Params): Promise<CreateAccount.Result>
}
