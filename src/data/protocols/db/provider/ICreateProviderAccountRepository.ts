export namespace CreateProviderAccountRepository {
  export type Params = {
    id: string
    name: string
    description: string
    serviceId: number
    cnpj?: string
    createdAt: Date
  }

  export type Result = boolean
}
export interface ICreateProviderAccountRepository {
  create(params: CreateProviderAccountRepository.Params): Promise<CreateProviderAccountRepository.Result>
}
