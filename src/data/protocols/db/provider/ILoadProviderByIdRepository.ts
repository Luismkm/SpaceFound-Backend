export namespace LoadProviderByIdRepository {
  export type Params = string
  export type Result = {
    accountId: string,
    serviceId: string,
    description: string,
    avatar: string,
    average: number
  }
}

export interface ILoadProviderByIdRepository {
  loadById(id: LoadProviderByIdRepository.Params): Promise<LoadProviderByIdRepository.Result>
}
