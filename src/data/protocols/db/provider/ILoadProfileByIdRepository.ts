export namespace LoadProfileByIdRepository {
  export type Result = {
    accountId: string
    serviceId: string
    description: string
    avatar: string
    averageStars: number
  }
}

export interface ILoadProfileByIdRepository {
  loadProfileById(id: string): Promise<LoadProfileByIdRepository.Result>
}
