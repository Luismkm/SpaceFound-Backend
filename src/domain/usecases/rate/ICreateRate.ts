import { IRate } from '@/domain/models/IRate';

export type ICreateRateDTO = Omit<IRate, 'id'>

export interface ICreateRate {
  create(rate: ICreateRateDTO): Promise<IRate>
}
