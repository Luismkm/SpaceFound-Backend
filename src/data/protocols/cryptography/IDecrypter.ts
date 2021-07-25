import { ITokenPayload } from './ITokenPayload';

export interface IDecrypter {
  decrypt (value: string): ITokenPayload
}
