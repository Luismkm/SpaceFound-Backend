import { knexHelper } from '@/infra/database/helpers';

import { CreateAccountRepository, ICreateAccountRepository } from '@/data/protocols';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/account/ICheckAccountByEmailRepository';

export class AccountPostgresRepository implements
  ICreateAccountRepository,
  ILoadAccountByEmailRepository,
  ICheckAccountByEmailRepository {
  async create(account: CreateAccountRepository.Params): Promise<CreateAccountRepository.Result> {
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
    return account[0] !== null;
  }
}
