import { DbCreateAccount } from '@/data/usecases/account/createAccount/DbCreateAccount';
import { BcryptAdapter } from '@/infra/cryptography/bcryptAdapter/BcryptAdapter';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';

import { ICreateAccount } from '@/domain/usecases/account/ICreateAccount';

export const makeDbCreateAccount = (): ICreateAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbCreateAccount(bcryptAdapter, accountPostgresRepository, accountPostgresRepository);
};
