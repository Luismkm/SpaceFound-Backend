export namespace CreateProvider {
  export type Params = {
    name: string
    description: string
    cnpj: string
    serviceId: number
    userId: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateProvider {
  create(params: CreateProvider.Params): Promise<CreateProvider.Result>
}
