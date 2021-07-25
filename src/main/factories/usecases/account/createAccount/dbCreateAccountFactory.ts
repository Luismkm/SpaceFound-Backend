import { DbCreateAccount } from '@/data/usecases/account/createAccount/DbCreateAccount';
import { BcryptAdapter } from '@/infra/cryptography/bcryptAdapter/BcryptAdapter';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';

import { ICreateAccount } from '@/domain/usecases/account/ICreateAccount';
import { UuidAdapter } from '@/infra/helpers/uuidAdapter/UuidAdapter';

export const makeDbCreateAccount = (): ICreateAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const uuidAdapter = new UuidAdapter();
  const accountPostgresRepository = new AccountPostgresRepository();
  return new DbCreateAccount(
    bcryptAdapter,
    uuidAdapter,
    accountPostgresRepository,
    accountPostgresRepository,
  );
};
