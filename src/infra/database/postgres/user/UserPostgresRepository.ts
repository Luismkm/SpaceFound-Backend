import { knexHelper } from '@/infra/database/helpers';

import { IAccount } from '@/domain/models/IAccount';
import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatarRepository } from '@/data/protocols/db/user/IUpdateAvatarRepository';

export class UserPostgresRepository implements
  IFindUserByIdRepository,
  IUpdateAvatarRepository {
  async findById(id: string): Promise<IAccount | undefined> {
    const user = await knexHelper.knex('users').where('id', id);
    return user[0];
  }

  async update(userId: string, fileName: string): Promise<IAccount> {
    console.log(userId, fileName);
    await knexHelper.knex('users').update('avatar', fileName).where('id', userId);
    return null;
  }
}