export namespace CreateRateRepository {
  export type Params = {
    id: string
    star: number
    comment: string
    accountId: string
    providerId: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateRateRepository {
  create(params: CreateRateRepository.Params): Promise<CreateRateRepository.Result>
}
