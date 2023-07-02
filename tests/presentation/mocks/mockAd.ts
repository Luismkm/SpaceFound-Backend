import { CreateAd, ICreateAd } from '@/domain/usecases/ad/ICreateAd';
import { IListAdByAccount, ListAdsByAccount } from '@/domain/usecases/ad/IListAdsByAccount';

export class CreateAdSpy implements ICreateAd {
  params: CreateAd.Params
  result = true

  async create(params: CreateAd.Params): Promise<CreateAd.Result> {
    this.params = params;
    return this.result;
  }
}

export class ListAdsByAccountSpy implements IListAdByAccount {
  id: string
  result = [
    {
      id: 'any_id',
      accountId: 'any_uuid',
      title: 'any_title',
      description: 'any_description',
      serviceId: '1',
      isAdActive: false,
      createdAt: new Date(),
      updateAt: new Date(),
    },
  ]

  async listByAccount(params: ListAdsByAccount.Params): Promise<ListAdsByAccount.Result> {
    this.id = params.accountId
    return this.result
  }
}
