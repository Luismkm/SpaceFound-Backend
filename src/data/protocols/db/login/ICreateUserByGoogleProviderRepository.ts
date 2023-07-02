export namespace CreateUserByGoogleProviderRepository {
  export type Params = {
    id: string
    name: string
    email: string
    avatar:string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateUserByGoogleProviderRepository {
  create(account: CreateUserByGoogleProviderRepository.Params): Promise<CreateUserByGoogleProviderRepository.Result>
}
