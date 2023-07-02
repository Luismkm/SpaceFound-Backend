import { CreateRate, ICreateRate } from '@/domain/usecases/rate/ICreateRate';

export class CreateRateSpy implements ICreateRate {
  params: CreateRate.Params
  result = true

  async create(params: CreateRate.Params): Promise<CreateRate.Result> {
    this.params = params;
    return this.result;
  }
}
