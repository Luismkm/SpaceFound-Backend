import { DbFindUserById } from '@/data/usecases/user/DbFindUserById';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';

import { IFindUserById } from '@/domain/usecases/user/IFindUserById';

export const makeDbFindUserById = (): IFindUserById => {
  const userMongoRepository = new UserPostgresRepository();
  return new DbFindUserById(userMongoRepository);
};
