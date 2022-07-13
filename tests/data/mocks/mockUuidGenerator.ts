import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';

export class UuidGeneratorStub implements IUuidGenerator {
  digest = 'any_uuid'
  uuidGenerator(): string {
    return this.digest;
  }
}
