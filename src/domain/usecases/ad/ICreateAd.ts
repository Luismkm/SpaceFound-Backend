export namespace CreateAd {
  export type Params = {
    accountId: string
    accountType: string
    title: string
    description: string
    serviceId: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAd{
  create(params: CreateAd.Params): Promise<CreateAd.Result>
}
