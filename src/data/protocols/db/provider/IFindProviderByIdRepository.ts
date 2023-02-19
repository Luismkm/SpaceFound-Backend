export namespace FindProviderByIdRepository {
  export type Params = string
  export type Result = {
    id: string;
    avatar: string;
  }
}

export interface IFindProviderByIdRepository {
  findById(id: FindProviderByIdRepository.Params): Promise<FindProviderByIdRepository.Result>
}
