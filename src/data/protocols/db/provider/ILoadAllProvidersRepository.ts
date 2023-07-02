export namespace LoadAllProvidersRepository {
  export type Result = {
    providerId: string,
    name: string,
    description: string,
    avatar: string,
    average: number,
    service: string
  }
}

export interface ILoadAllProvidersRepository {
  loadAll(): Promise<LoadAllProvidersRepository.Result[]>
}
