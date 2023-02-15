import { knexHelper } from '@/infra/database/helpers';

import { FindUserByIdRepository, IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { CreateUserAccountRepository, ICreateUserAccountRepository,
  IUpdateAvatarRepository,
  IUpdateUserProfileRepository, UpdateUserAvatarRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';

export class UserPostgresRepository implements
  ICreateUserAccountRepository,
  IFindUserByIdRepository,
  IUpdateUserProfileRepository,
  IUpdateAvatarRepository {
  async create(account: CreateUserAccountRepository.Params): Promise<CreateUserAccountRepository.Result> {
    const { id, name, email, password, cityId } = account;
    const accountCreated = await knexHelper.knex('user').insert({ id, name, email, password }).returning('id');
    return accountCreated !== null;
  }

  async update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    const asReturn = await knexHelper.knex('user').update({ name: profile.name, email: profile.email, city_id: profile.cityId }).where('id', profile.userId).limit(1);
    return asReturn !== null;
  }

  async updateAvatar({ userId, fileName }: UpdateUserAvatarRepository.Params): Promise<UpdateUserAvatarRepository.Result> {
    const avatar = await knexHelper.knex('user').update('avatar', fileName).where('id', userId).returning('avatar');
    return avatar[0];
  }

  async findById(id: string): Promise<FindUserByIdRepository.Result> {
    const user = await knexHelper.knex('user').where('id', id);
    const { city_id, ...userWithoutCity_Id } = user[0]
    return { ...userWithoutCity_Id, cityId: city_id }
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await knexHelper.knex('user').where('email', email);
    return account.length === 1;
  }

  async loadByEmail(email: string): Promise<any> {
    const account = await knexHelper.knex('user').where('email', email);
    return account[0];
  }
}
