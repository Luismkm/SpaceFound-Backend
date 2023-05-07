export namespace CheckProviderByCnpj {
  export type Result = boolean
}

export interface ICheckProviderByCnpj {
  checkProviderByCnpj(cnpj: string): Promise<CheckProviderByCnpj.Result>
}
