export namespace CheckProviderByIdRepository {
  export type Result = boolean
}

export interface ICheckProviderByIdRepository {
  checkProfileById: (id: string) => Promise<CheckProviderByIdRepository.Result>
}
