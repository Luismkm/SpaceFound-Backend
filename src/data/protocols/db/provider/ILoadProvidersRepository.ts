export namespace LoadProvidersRepository {
  export type Result = {
    id: string,
    idBusiness: string,
    description: string,
    idUser: string,
    idProvider: string,
    average: number
  }
}

export interface ILoadProvidersRepository {
  loadAll(): Promise<LoadProvidersRepository.Result[]>
}
