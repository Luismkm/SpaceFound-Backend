import { ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';
import { IRate } from '@/domain/models/IRate';
import { ICreateRate, ICreateRateDTO } from '@/domain/usecases/rate/ICreateRate';

export default class DbCreateRate implements ICreateRate {
  constructor(private readonly createRate: ICreateRateRepository) {}

  async create(rate: ICreateRateDTO): Promise<IRate> {
    const rateCreated = this.createRate.create(rate);
    return rateCreated;
  }
}
