export namespace LoadProviders {
  export type Result = {
    id: string,
    idBusiness: string,
    description: string,
    idUser: string,
    idProvider: string,
    average: number
  }
}

export interface ILoadProviders {
  load(): Promise<LoadProviders.Result[]>
}
