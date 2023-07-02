export namespace LoadProviderById {
  export type Result = {
    accountId: string
    serviceId: string
    description: string
    avatar: string
    averageStars: number
  }
}

export interface ILoadProviderById {
  load(id: string): Promise<LoadProviderById.Result>
}
