import { CreateRateRepository, ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';

export class CreateRateRepositorySpy implements ICreateRateRepository {
  params: CreateRateRepository.Params
  result = true

  async create(params: CreateRateRepository.Params): Promise<CreateRateRepository.Result> {
    this.params = params;
    return this.result;
  }
}
