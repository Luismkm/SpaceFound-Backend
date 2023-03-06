export namespace CreateAdRepository {
  export type Params = {
    id: string
    accountId: string
    accountType: string
    title: string
    description: string
    serviceId: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAdRepository {
  create(params: CreateAdRepository.Params): Promise<CreateAdRepository.Result>
}
