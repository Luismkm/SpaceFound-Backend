import { ICreateRateRepository } from '@/data/protocols/db/rate/ICreateRateRepository';
import { ICreateRateDTO } from '@/domain/usecases/rate/ICreateRate';
import { mockRate } from '@/tests/domain/mocks/mockRate';

export const mockCreateRateRepository = (): ICreateRateRepository => {
  class CreateRateRepositoryStub implements ICreateRateRepository {
    async create(rate: ICreateRateDTO): Promise<any> {
      return Promise.resolve(mockRate());
    }
  }
  return new CreateRateRepositoryStub();
};
