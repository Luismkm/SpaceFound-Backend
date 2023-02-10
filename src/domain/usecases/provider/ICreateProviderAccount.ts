export namespace CreateProviderAccount {
  export type Params = {
    name: string
    description: string
    cnpj?: string
    serviceId: number
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateProviderAccount {
  create(params: CreateProviderAccount.Params): Promise<CreateProviderAccount.Result>
}
