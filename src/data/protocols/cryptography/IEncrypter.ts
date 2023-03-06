export type encrypterParams = {
  sub: string,
  accountType: string
}

export interface IEncrypter {
  encrypt({ sub, accountType }:encrypterParams): any
}
