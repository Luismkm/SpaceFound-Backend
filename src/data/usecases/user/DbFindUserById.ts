import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IAccount, IFindUserById } from './DbUserProtocols';

export class DbFindUserById implements IFindUserById {
  constructor(private readonly loadUserByIdRepository: IFindUserByIdRepository) {}

  async findById(id: string): Promise<IAccount | undefined> {
    const survey = await this.loadUserByIdRepository.findById(id);
    return survey;
  }
}
