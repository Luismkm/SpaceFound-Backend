import { knexHelper } from '@/infra/database/helpers';

import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatarRepository } from '@/data/protocols/db/user/IUpdateAvatarRepository';
import { IUpdateUserProfileRepository } from '@/data/protocols/db/user/IUpdateProfileRepository';
import { IAccount } from '@/data/usecases/user/DbUserProtocols';
import { IUpdateUserProfileDTO } from '@/domain/usecases/protocols/IUserProfileDTO';

type Output = {
  avatar: string
}

export class UserPostgresRepository implements
  IFindUserByIdRepository,
  IUpdateAvatarRepository,
  IUpdateUserProfileRepository {
  async findById(id: string): Promise<IAccount | undefined> {
    const user = await knexHelper.knex('users').where('id', id);
    return user[0];
  }

  async updateAvatar(userId: string, fileName: string): Promise<Output> {
    await knexHelper.knex('users').update('avatar', fileName).where('id', userId);
    return null;
  }

  async update(profile: IUpdateUserProfileDTO): Promise<IAccount> {
    const user = await knexHelper.knex('users').update({ name: profile.name, email: profile.email }).where('id', profile.userId).limit(1);
    console.log(user);
    return null;
  }
}
