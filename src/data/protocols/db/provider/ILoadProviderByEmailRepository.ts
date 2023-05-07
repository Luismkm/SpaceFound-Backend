export namespace LoadProviderByEmailRepository {
  export type Params = string
  export type Result = {
    id: string;
    password: string;
  }
}

export interface ILoadProviderByEmailRepository {
  loadByEmail(email: LoadProviderByEmailRepository.Params): Promise<LoadProviderByEmailRepository.Result>
}
