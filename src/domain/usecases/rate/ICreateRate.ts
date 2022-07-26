export namespace CreateRate {
  export type Params = {
    star: number
    comment: string
    userId: string
    providerId: string
    createdAt: Date
  }

  export type Result = boolean
}
export interface ICreateRate {
  create(params: CreateRate.Params): Promise<CreateRate.Result>
}
