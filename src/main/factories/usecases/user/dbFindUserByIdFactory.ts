import { DbFindUserById } from '@/data/usecases/user/loadUserById/DbFindUserById';
import { IFindUserById } from '@/domain/usecases/user/IFindUserById';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';

export const makeDbFindUserById = (): IFindUserById => {
  const userMongoRepository = new UserPostgresRepository();
  return new DbFindUserById(userMongoRepository);
};
