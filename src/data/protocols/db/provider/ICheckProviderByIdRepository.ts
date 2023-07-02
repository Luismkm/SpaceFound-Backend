export namespace CheckProviderByIdRepository {
  export type Result = boolean
}

export interface ICheckProviderByIdRepository {
  checkProviderById: (id: string) => Promise<CheckProviderByIdRepository.Result>
}
