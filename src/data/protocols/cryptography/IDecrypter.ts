import { ITokenPayload } from '../helpers/ITokenPayload';

export interface IDecrypter {
  decrypt (value: string): ITokenPayload
}
