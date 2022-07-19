import { IProvider } from '@/domain/models/IProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';
import { LoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';
import { CreateProvider } from '@/domain//usecases/provider/ICreateProvider';

export const mockCreateProviderParams = (): CreateProvider.Params => ({
  name: 'any_name',
  description: 'any_description',
  cnpj: 'any_cnpj',
  serviceId: 1,
  userId: 'any_uuid',
  createdAt: new Date(),
});

export const mockProviders = (): LoadProvidersRepository.Result[] => [{
  id: 'any_uuid',
  idBusiness: 'any_uuid',
  description: 'any_description',
  idUser: 'any_uuid',
  idProvider: 'any_uuid',
  average: 4.5,
},
{
  id: 'any_uuid',
  idBusiness: 'any_uuid',
  description: 'any_description',
  idUser: 'any_uuid',
  idProvider: 'any_uuid',
  average: 4.5,
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
