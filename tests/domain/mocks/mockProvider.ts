import { ICreateProviderDTO } from '@/domain/usecases/provider/ICreateProvider';
import { IProvider } from '@/domain/models/IProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';

export const mockProviderDTO = (): ICreateProviderDTO => ({
  idBusiness: 0,
  description: 'any_description',
  idUser: 'any_uuid',
});

export const mockProvider = (): IProvider => ({
  ...mockProviderDTO(), id: 'any_uuid',
});

export const mockProviders = (): IProvider[] => [{
  id: 'any_uuid',
  idBusiness: 1,
  description: 'any_description',
  idUser: 'any_uuid',
},
{
  id: 'other_uuid',
  idBusiness: 2,
  description: 'other_description',
  idUser: 'other_uuid',
}];

export const mockProviderProfile = ():IProviderProfile => ({
  provider: [
    {
      id: 2,
      idBusiness: '1',
      description: 'any description',
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 3,
      comment: 'any_comment',
    },
    {
      id: 2,
      idBusiness: '1',
      description: 'any description',
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 3,
      comment: 'other_comment',
    },
  ],
  averageStars: 3,
});
