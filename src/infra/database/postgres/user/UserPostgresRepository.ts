import { knexHelper } from '@/infra/database/helpers';

import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateAvatarRepository, UpdateAvatarRepository } from '@/data/protocols';
import { IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';

export class UserPostgresRepository implements
  IFindUserByIdRepository,
  IUpdateAvatarRepository,
  IUpdateUserProfileRepository {
  async findById(id: string): Promise<undefined> {
    const user = await knexHelper.knex('users').where('id', id);
    return user[0];
  }

  async updateAvatar({ userId, fileName }: UpdateAvatarRepository.Params): Promise<UpdateAvatarRepository.Result> {
    const avatar = await knexHelper.knex('users').update('avatar', fileName).where('id', userId).returning('avatar');
    return avatar[0];
  }

  async update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    await knexHelper.knex('users').update({ name: profile.name, email: profile.email }).where('id', profile.userId).limit(1);
    return null;
  }
}
