import { CreateAdRepository, ICreateAdRepository } from '@/data/protocols/db/ad/ICreateAdRepository';

export class CreateAdRepositorySpy implements ICreateAdRepository {
  params: CreateAdRepository.Params
  result = true

  async create(params: CreateAdRepository.Params): Promise<CreateAdRepository.Result> {
    this.params = params;
    return this.result;
  }
}
