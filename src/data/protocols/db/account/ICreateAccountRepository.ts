export namespace CreateAccountRepository {
  export type Params = {
    id: string
    name: string
    email: string
    password: string
    cityId: number
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAccountRepository {
  create(account: CreateAccountRepository.Params): Promise<CreateAccountRepository.Result>
}
