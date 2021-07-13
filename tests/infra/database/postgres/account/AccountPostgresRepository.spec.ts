import { KnexHelper } from '@/main/helpers/index2';

import { AccountPostgresRepository } from '@/infra/database/postgres/account/AccountPostgresRepository';
import { mockAccountDTO } from '@/tests/domain/mocks';

let sut: AccountPostgresRepository;

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    KnexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new AccountPostgresRepository();
  });
  describe('create()', () => {
    it('should return an account on create success', async () => {
      const account = await sut.create(mockAccountDTO());
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email');
      expect(account.password).toBe('any_password');
      await KnexHelper.knex('users').delete('*');
    });
  });
});
