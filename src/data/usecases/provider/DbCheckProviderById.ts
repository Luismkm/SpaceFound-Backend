import { ICheckProviderByIdRepository } from '@/data/protocols/db/provider/ICheckProviderByIdRepository';
import { ICheckProviderById } from '@/domain/usecases/provider/ICheckProviderById';

export class DbCheckProviderById implements ICheckProviderById {
  constructor(private readonly checkProviderByIdRepository: ICheckProviderByIdRepository) {}

  async checkProviderById(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}
