import { KnexHelper } from '@/infra/database/helpers';

import { ICreateAccountRepository } from '@/data/protocols';
import { IAccount } from '@/domain/models/IAccount';
import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/account/ILoadAccountByEmailRepository';

export class AccountPostgresRepository implements
 ICreateAccountRepository,
 ILoadAccountByEmailRepository {
  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const { name, email, password } = account;
    const insertedUserId = await KnexHelper.knex('users').insert({ name, email, password }).returning('id');
    const userId = insertedUserId[0];
    return { ...account, id: userId };
  }

  async loadByEmail(value: string): Promise<any> {
    const email = value;
    const account = await KnexHelper.knex('users').where('email', email);
    return account[0];
  }
}
