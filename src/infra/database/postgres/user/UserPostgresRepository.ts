import { knexHelper } from '@/infra/database/helpers';

import { IAccount } from '@/domain/models/IAccount';
import { ILoadUserById } from '@/domain/usecases/user/ILoadUserById';

export class UserPostgresRepository implements ILoadUserById {
  async loadById(id: string): Promise<IAccount | undefined> {
    const user = await knexHelper.knex('users').where('id', id);
    return user[0];
  }
}
