import { ILoadProfileByIdRepository } from '@/data/protocols/db/provider/ILoadProfileByIdRepository';
import { ILoadProfileById, LoadProfileById } from '@/domain/usecases/provider/ILoadProfileById';

export class DbLoadProfileById implements ILoadProfileById {
  constructor(private readonly loadProfileByIdRepository: ILoadProfileByIdRepository) {}

  async load(id: string): Promise<LoadProfileById.Result> {
    return this.loadProfileByIdRepository.loadProfileById(id);
  }
}
