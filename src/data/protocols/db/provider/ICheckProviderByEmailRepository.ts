export namespace CheckProviderByEmailRepository {
  export type Params = string
  export type Result = boolean
}

export interface ICheckProviderByEmailRepository {
  checkProviderByEmail(email: CheckProviderByEmailRepository.Params): Promise<CheckProviderByEmailRepository.Result>
}
