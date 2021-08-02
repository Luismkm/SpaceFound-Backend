import { knexHelper } from '@/infra/database/helpers';
import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';

import { mockAccount } from '@/tests/domain/mocks';

let sut: AccountPostgresRepository;

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new AccountPostgresRepository();
  });
  describe('create()', () => {
    it('should return an account on create success', async () => {
      const account = await sut.create(mockAccount());
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email');
      expect(account.password).toBe('any_password');
      await knexHelper.knex('users').delete('*');
    });
  });

  describe('loadByEmail', () => {
    it('should return an account on loadByEmail success', async () => {
      await sut.create(mockAccount());
      const account = await sut.loadByEmail('any_email');
      expect(account.name).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email');
      expect(account.password).toBe('any_password');
      await knexHelper.knex('users').delete('*');
    });

    it('should return null if loadByEmail fails', async () => {
      const account = await sut.loadByEmail('any_email');
      expect(account).toBeFalsy();
    });
  });
});
