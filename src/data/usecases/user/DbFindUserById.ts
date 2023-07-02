import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUser, IFindUserById } from './DbUserProtocols';

export class DbFindUserById implements IFindUserById {
  constructor(private readonly loadUserByIdRepository: IFindUserByIdRepository) {}

  async findById(id: string): Promise<IUser | undefined> {
    const survey = await this.loadUserByIdRepository.findById(id);
    return survey;
  }
}
