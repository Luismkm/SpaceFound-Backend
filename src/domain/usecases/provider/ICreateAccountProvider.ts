export namespace CreateAccountProvider {
  export type Params = {
    name: string
    description: string
    cnpj?: string
    serviceId: number
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAccountProvider {
  create(params: CreateAccountProvider.Params): Promise<CreateAccountProvider.Result>
}
