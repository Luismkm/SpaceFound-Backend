export namespace ISendEmailService {
  export type Params = {
    to: {
      name: string,
      email: string
    }
  }
}

export interface ISendEmailService {
  send(params: ISendEmailService.Params): Promise<void>
}
