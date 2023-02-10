import { knexHelper } from '@/infra/database/helpers';

import { CreateUserAccountRepository, ICreateUserAccountRepository, IUpdateAvatarRepository, UpdateUserAvatarRepository } from '@/data/protocols';
import { ILoadAccountByEmailRepository } from '@/data/protocols/db/user/ILoadUserByEmailRepository';
import { ICheckAccountByEmailRepository } from '@/data/protocols/db/account/ICheckAccountByEmailRepository';

export class AccountPostgresRepository implements
  ILoadAccountByEmailRepository,
  ICheckAccountByEmailRepository,
  IUpdateAvatarRepository {
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
