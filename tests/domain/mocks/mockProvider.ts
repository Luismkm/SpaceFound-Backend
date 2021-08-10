import { ICreateProviderDTO } from '@/domain/usecases/provider/ICreateProvider';
import { IProvider } from '@/domain/models/IProvider';

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
