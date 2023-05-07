export namespace CheckProviderByCnpjRepository {
  export type Params = string
  export type Result = boolean
}

export interface ICheckProviderByCnpjRepository {
  checkProviderByCnpj(cnpj: CheckProviderByCnpjRepository.Params): Promise<CheckProviderByCnpjRepository.Result>
}
