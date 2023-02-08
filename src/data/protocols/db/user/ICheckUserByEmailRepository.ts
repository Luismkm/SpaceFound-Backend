export namespace CheckUserByEmailRepository {
  export type Params = string
  export type Result = boolean
}

export interface ICheckAccountByEmailRepository {
  checkByEmail(email: CheckUserByEmailRepository.Params): Promise<CheckUserByEmailRepository.Result>
}
