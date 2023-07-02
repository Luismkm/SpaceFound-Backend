export namespace CheckProviderById {
  export type Result = boolean
}

export interface ICheckProviderById {
  checkProviderById(id: string): Promise<CheckProviderById.Result>
}
