import { knexHelper } from '@/infra/database/helpers';

import { IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';

export class UserPostgresRepository implements
  IFindUserByIdRepository,
  IUpdateUserProfileRepository {
  async update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    const asReturn = await knexHelper.knex('user').update({ name: profile.name, email: profile.email }).where('id', profile.userId).limit(1);
    return asReturn !== null;
  }

  async findById(id: string): Promise<undefined> {
    const user = await knexHelper.knex('user').where('id', id);
    return user[0];
  }
}
