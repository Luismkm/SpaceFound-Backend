import { knexHelper } from '@/infra/database/helpers';

import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatarRepository } from '@/data/protocols/db/user/IUpdateAvatarRepository';
import { IAccount } from '@/data/usecases/user/DbUserProtocols';

export class UserPostgresRepository implements
  IFindUserByIdRepository,
  IUpdateAvatarRepository {
  async findById(id: string): Promise<IAccount | undefined> {
    const user = await knexHelper.knex('users').where('id', id);
    return user[0];
  }

  async update(userId: string, fileName: string): Promise<IAccount> {
    await knexHelper.knex('users').update('avatar', fileName).where('id', userId);
    return null;
  }
}
