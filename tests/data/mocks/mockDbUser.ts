import { ILoadUserByIdRepository } from '@/data/protocols/db/user/ILoadUserByIdRepository';
import { IAccount } from '@/domain/models/IAccount';
import { mockAccount } from '@/tests/domain/mocks';

export const mockLoadUserByIdRepository = (): ILoadUserByIdRepository => {
  class LoadUserByIdRepositoryStub implements ILoadUserByIdRepository {
    async loadById(id: string): Promise<IAccount | undefined> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadUserByIdRepositoryStub();
};
