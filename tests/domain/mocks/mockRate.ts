import { CreateRate } from '@/domain/usecases/rate/ICreateRate';

export const mockRateParams = (): CreateRate.Params => ({
  star: 1,
  comment: 'any_comment',
  accountId: 'any_uuid',
  providerId: 'any_uuid',
  createdAt: new Date(),
});
