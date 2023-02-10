import { knexHelper } from '@/infra/database/helpers';

import { CreateUserAccountRepository, ICreateAccountRepository, IUpdateAvatarRepository, UpdateUserAvatarRepository } from '@/data/protocols';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/user/ILoadUserByEmailRepository';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/account/ICheckAccountByEmailRepository';

export class AccountPostgresRepository implements
  ICreateAccountRepository,
  ILoadAccountByEmailRepository,
  ICheckAccountByEmailRepository,
  IUpdateAvatarRepository {
  async create(account: CreateUserAccountRepository.Params): Promise<CreateUserAccountRepository.Result> {
    const { id, name, email, password, cityId } = account;
    const accountCreated = await knexHelper.knex('user').insert({ id, name, email, password, city_id: cityId }).returning('id');
    return accountCreated !== null;
  }

  async loadByEmail(email: string): Promise<any> {
    const account = await knexHelper.knex('user').where('email', email);
    return account[0];
  }

  async checkByEmail(email: string): Promise<boolean> {
    const account = await knexHelper.knex('user').where('email', email);
    return account.length === 1;
  }

  async updateAvatar({ userId, fileName }: UpdateUserAvatarRepository.Params): Promise<UpdateUserAvatarRepository.Result> {
    const avatar = await knexHelper.knex('user').update('avatar', fileName).where('id', userId).returning('avatar');
    return avatar[0];
  }
}
