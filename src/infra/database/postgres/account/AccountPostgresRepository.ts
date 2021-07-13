import { KnexHelper } from '@/main/helpers/index2';

import { ICreateAccountRepository } from '@/data/protocols';
import { IAccount } from '@/domain/models/IAccount';
import { ICreateAccountDTO } from '@/domain/usecases/account/ICreateAccount';

export class AccountPostgresRepository implements ICreateAccountRepository {
  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const { name, email, password } = account;
    const insertedUserId = await KnexHelper.knex('users').insert({ name, email, password }).returning('id');
    const userId = insertedUserId[0];
    return { ...account, id: userId };
  }
}
