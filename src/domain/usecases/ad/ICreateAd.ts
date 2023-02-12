export namespace CreateAd {
  export type Params = {
    userId: string
    title: string
    description: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAd{
  create(params: CreateAd.Params): Promise<CreateAd.Result>
}
