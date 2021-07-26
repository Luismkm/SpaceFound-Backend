import { ILoadUserByIdRepository } from '@/data/protocols/db/user/ILoadUserByIdRepository';
import { IAccount } from '@/domain/models/IAccount';
import { ILoadUserById } from '@/domain/usecases/user/ILoadUserById';

export class DbLoadUserById implements ILoadUserById {
  constructor(private readonly loadUserByIdRepository: ILoadUserByIdRepository) {}

  async loadById(id: string): Promise<IAccount | undefined> {
    const survey = await this.loadUserByIdRepository.loadById(id);
    return survey;
  }
}
