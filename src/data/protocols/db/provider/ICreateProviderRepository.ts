export namespace CreateProviderRepository {
  export type Params = {
    id: string
    name: string
    description: string
    serviceId: number
    cnpj: string
    userId: string
    createdAt: Date
  }

  export type Result = boolean
}
export interface ICreateProviderRepository {
  create(params: CreateProviderRepository.Params): Promise<CreateProviderRepository.Result>
}
