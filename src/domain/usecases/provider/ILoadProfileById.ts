export namespace LoadProfileById {
  export type Result = {
    accountId: string
    serviceId: string
    description: string
    avatar: string
    averageStars: number
    }
}

export interface LoadProfileById {
  loadProfileById(id: string): Promise<LoadProfileById.Result>
}
