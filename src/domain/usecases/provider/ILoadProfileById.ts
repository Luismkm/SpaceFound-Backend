export namespace LoadProfileById {
  export type Result = {
    accountId: string
    serviceId: string
    description: string
    avatar: string
    averageStars: number
    }
}

export interface ILoadProfileById {
  load(id: string): Promise<LoadProfileById.Result>
}
