import { IProvider } from '@/domain/models/IProvider';
import { IProviderProfile } from '@/domain/usecases/protocols/IProviderProfile';
import { LoadProvidersRepository } from '@/data/protocols/db/provider/ILoadProvidersRepository';
import { CreateProviderAccount } from '@/domain/usecases/provider/ICreateProviderAccount';

export const mockCreateProviderParams = (): CreateProviderAccount.Params => ({
  name: 'any_name',
  description: 'any_description',
  email: 'any_email',
  cnpj: 'any_cnpj',
  serviceId: 1,
  createdAt: new Date(),
});

export const mockProvider = (): IProvider => ({
  id: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
  description: 'any_description',
  cnpj: 'any_cnpj',
  serviceId: 1,
  avatar: 'any_avatar',
  createdAt: new Date(),
  updatedAt: new Date(),
})

export const mockProviders = (): LoadProvidersRepository.Result[] => [{
  id: 'any_uuid',
  serviceId: 'any_uuid',
  description: 'any_description',
  idUser: 'any_uuid',
  idProvider: 'any_uuid',
  average: 4.5,
},
{
  id: 'any_uuid',
  serviceId: 'any_uuid',
  description: 'any_description',
  idUser: 'any_uuid',
  idProvider: 'any_uuid',
  average: 4.5,
}];

export const mockProviderProfile = ():IProviderProfile => ({
  provider: [
    {
      id: 2,
      serviceId: '1',
      description: 'any description',
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 3,
      comment: 'any_comment',
    },
    {
      id: 2,
      serviceId: '1',
      description: 'any description',
      idUser: 'any_uuid',
      idProvider: 'any_uuid',
      star: 3,
      comment: 'other_comment',
    },
  ],
  averageStars: 3,
});
