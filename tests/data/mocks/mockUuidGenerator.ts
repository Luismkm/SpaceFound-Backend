import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';

export const mockUuidGenerator = (): IUuidGenerator => {
  class UuidGeneratorStub implements IUuidGenerator {
    uuidGenerator(): string {
      return 'any_uuid';
    }
  }
  return new UuidGeneratorStub();
};
