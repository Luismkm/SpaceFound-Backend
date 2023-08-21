import { knexHelper } from '@/infra/database/helpers';

import { FindUserByIdRepository, IFindUserByIdRepository } from '@/data/protocols/db/user/IFindUserByIdRepository';
import { CreateUserAccountRepository, ICreateUserAccountRepository,
  IUpdateUserProfileRepository, UpdateUserProfileRepository } from '@/data/protocols/db/user';
import { UpdateAccountAvatarRepository } from '@/data/protocols/db/account/IUpdateAccountAvatarRepository';

export class UserPostgresRepository implements
  ICreateUserAccountRepository,
  IFindUserByIdRepository,
  IUpdateUserProfileRepository {
  async create(account: CreateUserAccountRepository.Params): Promise<CreateUserAccountRepository.Result> {
    const { id, name, email, password, cityId } = account;
    const accountCreated = await knexHelper.knex('user').insert({ id, name, email, password, id_city: cityId, created_at: new Date() }).returning('id');
    return accountCreated !== null;
  }

  async update(profile: UpdateUserProfileRepository.Params): Promise<UpdateUserProfileRepository.Result> {
    const asReturn = await knexHelper.knex('user').update({ name: profile.name, email: profile.email, id_city: profile.cityId, updated_at: new Date() }).where('id', profile.accountId).limit(1);
    return asReturn !== null;
  }

  async findById(id: string): Promise<FindUserByIdRepository.Result> {
    const user = await knexHelper.knex('user').where('id', id);
    const { city_id, updated_at, ...rest } = user[0]
    return { cityId: city_id, updatedAt: updated_at, ...rest }
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await knexHelper.knex('user').where('email', email);
    return account.length === 1;
  }

  async loadByEmail(email: string): Promise<any> {
    const account = await knexHelper.knex('user').where('email', email);
    return account[0];
  }

  async updateAvatar({ accountId, filename }: UpdateAccountAvatarRepository.Params): Promise<UpdateAccountAvatarRepository.Result> {
    const asReturn = await knexHelper.knex('user').update({ avatar: filename, updated_at: new Date() }).where('id', accountId).limit(1)
    return asReturn !== null;
  }
}
