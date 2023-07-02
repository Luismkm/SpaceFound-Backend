export namespace CheckProviderByEmail {
  export type Result = boolean
}

export interface ICheckProviderByEmail {
  checkProviderByEmail(email: string): Promise<CheckProviderByEmail.Result>
}
