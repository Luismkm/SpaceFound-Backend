import { CreateAd, ICreateAd } from '@/domain/usecases/ad/ICreateAd';

export class CreateAdSpy implements ICreateAd {
  params: CreateAd.Params
  result = true

  async create(params: CreateAd.Params): Promise<CreateAd.Result> {
    this.params = params;
    return this.result;
  }
}
