import { knexHelper } from '@/infra/database/helpers';

import { ICreateAccountRepository } from '@/data/protocols';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';
import { IAccount } from '@/data/usecases/user/DbUserProtocols';

export class AccountPostgresRepository implements
 ICreateAccountRepository,
 ILoadAccountByEmailRepository {
  async create(account: IAccount): Promise<IAccount> {
    const {
      id, name, email, password,
    } = account;
    await knexHelper.knex('users').insert({
      id, name, email, password,
    });
    return account;
  }

  async loadByEmail(value: string): Promise<any> {
    const email = value;
    const account = await knexHelper.knex('users').where('email', email);
    return account[0];
  }
}
