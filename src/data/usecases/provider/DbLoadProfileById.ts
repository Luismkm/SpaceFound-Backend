import { ILoadProfileByIdRepository } from '@/data/protocols/db/provider/ILoadProfileByIdRepository';
import { LoadProfileById } from '@/domain/usecases/provider/ILoadProfileById';

export class DbLoadProfileById implements LoadProfileById {
  constructor(private readonly loadProfileByIdRepository: ILoadProfileByIdRepository) {}

  async loadProfileById(id: string): Promise<LoadProfileById.Result> {
    return this.loadProfileByIdRepository.loadProfileById(id);
  }
}
