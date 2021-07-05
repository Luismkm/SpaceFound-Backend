export type IAuthenticationDTO = {
  email: string,
  password: string
}

export interface IAuthentication {
  auth(data: IAuthenticationDTO): Promise<string>
}
