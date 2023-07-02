import { knexHelper } from '@/infra/database/helpers';
import { CreateUserAccountRepository } from '@/data/protocols/db/user';

export class GoogleProviderPostgresRepository {
  async create(account: any): Promise<CreateUserAccountRepository.Result> {
    const { id, name, email, picture } = account;
    const accountCreated = await knexHelper.knex('user').insert({ id, name, email, avatar: picture, created_at: new Date().toISOString() }).returning('id');
    return accountCreated !== null;
  }

  /* async checkByEmail(email: string): Promise<boolean> {
    const account = await knexHelper.knex('user').where('email', email);
    return account.length === 1;
  } */

  async loadByEmail(email: string): Promise<any> {
    const account = await knexHelper.knex('user').where('email', email);
    return account[0];
  }
}
