import { IRate } from '@/domain/models/IRate';
import { IRateDTO } from '@/domain/usecases/rate/ICreateRate';

export interface ICreateRateRepository {
  create(rate: IRateDTO): Promise<any>
}
