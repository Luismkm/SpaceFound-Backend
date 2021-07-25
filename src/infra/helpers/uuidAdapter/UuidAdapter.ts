import { v4 } from 'uuid';

import { IUuidGenerator } from '@/data/protocols/helpers/IUuidGenerator';

export class UuidAdapter implements IUuidGenerator {
  uuidGenerator(): string {
    return v4();
  }
}
