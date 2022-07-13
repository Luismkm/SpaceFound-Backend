export namespace LoadAccountByEmailRepository {
  export type Params = string
  export type Result = {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
  }
}

export interface ILoadAccountByEmailRepository {
  loadByEmail(email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result>
}
