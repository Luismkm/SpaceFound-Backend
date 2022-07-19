import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';

export class UuidGeneratorSpy implements IUuidGenerator {
  digest = 'any_uuid'
  uuidGenerator(): string {
    return this.digest;
  }
}
