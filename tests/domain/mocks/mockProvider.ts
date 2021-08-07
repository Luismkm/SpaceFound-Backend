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
