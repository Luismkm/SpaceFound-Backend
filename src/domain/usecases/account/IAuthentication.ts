export type IAuthenticationDTO = {
  email: string,
  password: string
}

export interface IAuthentication {
  auth(authentication: IAuthenticationDTO): Promise<string>
}
