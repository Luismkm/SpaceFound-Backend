export namespace CreateUserAccountRepository {
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
  create(account: CreateUserAccountRepository.Params): Promise<CreateUserAccountRepository.Result>
}
