import { CreateAd } from '@/domain/usecases/ad/ICreateAd';

export const mockCreateAdParams = (): CreateAd.Params => ({
  userId: 'any_userId',
  title: 'any_title',
  description: 'any_description',
  createdAt: new Date(),
});
