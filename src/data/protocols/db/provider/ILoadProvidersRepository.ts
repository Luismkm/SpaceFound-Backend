export namespace LoadProvidersRepository {
  export type Result = {
    accountId: string,
    serviceId: string,
    description: string,
    avatar: string,
    average: number
  }
}

export interface ILoadProvidersRepository {
  loadAll(): Promise<LoadProvidersRepository.Result[]>
}
