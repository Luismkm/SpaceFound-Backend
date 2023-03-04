export namespace LoadProviders {
  export type Result = {
    accountId: string,
    serviceId: string,
    description: string,
    avatar: string,
    average: number
  }
}

export interface ILoadProviders {
  load(): Promise<LoadProviders.Result[]>
}
