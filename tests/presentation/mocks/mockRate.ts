import { IRate } from '@/domain/models/IRate';
import { ICreateRate, ICreateRateDTO } from '@/domain/usecases/rate/ICreateRate';
import { mockRate } from '@/tests/domain/mocks/mockRate';

export const mockCreateRate = (): ICreateRate => {
  class CreateRateStub implements ICreateRate {
    async create(Rate: ICreateRateDTO): Promise<IRate> {
      return Promise.resolve(mockRate());
    }
  }
  return new CreateRateStub();
};
