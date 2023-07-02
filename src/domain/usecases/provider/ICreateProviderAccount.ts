export namespace CreateProviderAccount {
  export type Params = {
    name: string
    description: string
    email: string
    cnpj?: string
    serviceId: number
    createdAt: Date
  }

  export type Result = boolean | Error
}

export interface ICreateProviderAccount {
  create(params: CreateProviderAccount.Params): Promise<CreateProviderAccount.Result>
}
