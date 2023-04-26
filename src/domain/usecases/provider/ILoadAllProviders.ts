export namespace LoadAllProviders {
  export type Result = {
    providerId: string,
    name: string,
    description: string,
    avatar: string,
    average: number,
    service: string
  }
}

export interface ILoadAllProviders {
  loadAll(): Promise<LoadAllProviders.Result[]>
}
