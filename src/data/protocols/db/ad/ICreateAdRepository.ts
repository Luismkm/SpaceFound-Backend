export namespace CreateAdRepository {
  export type Params = {
    id: string
    userId: string
    title: string
    description: string
    createdAt: Date
  }

  export type Result = boolean
}

export interface ICreateAdRepository {
  create(params: CreateAdRepository.Params): Promise<CreateAdRepository.Result>
}
