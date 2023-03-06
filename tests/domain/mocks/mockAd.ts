import { CreateAd } from '@/domain/usecases/ad/ICreateAd';

export const mockCreateAdParams = (): CreateAd.Params => ({
  accountId: 'any_accountId',
  accountType: 'any_account',
  title: 'any_title',
  description: 'any_description',
  serviceId: '1',
  createdAt: new Date(),
});
