import { CreateUserByGoogleProviderRepository, ICreateUserByGoogleProviderRepository } from '@/data/protocols/db/login/ICreateUserByGoogleProviderRepository';

export class CreateGoogleAccountRepositorySpy implements ICreateUserByGoogleProviderRepository {
  params: CreateUserByGoogleProviderRepository.Params
  result = true

  async create(params: CreateUserByGoogleProviderRepository.Params): Promise<CreateUserByGoogleProviderRepository.Result> {
    this.params = params;
    return this.result;
  }
}
