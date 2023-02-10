import { knexHelper } from '@/infra/database/helpers';

import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { UpdateUserProfileRepository } from '@/data/protocols';
import { mockAccount } from '@/tests/domain/mocks';

let sut: UserPostgresRepository;

const mockParams = ():UpdateUserProfileRepository.Params => ({
  userId: 'any_uuid',
  name: 'any_name',
  email: 'any_email',
});

describe('Account Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new UserPostgresRepository();
  });

  describe('create()', () => {
    it('should return true on create success', async () => {
      const account = await sut.create(mockAccount());
      expect(account).toBeTruthy();
      await knexHelper.knex('user').delete('*');
    });
  });

  describe('update', () => {
    it('should return true on update with success', async () => {
      const succeeds = await sut.update(mockParams());
      expect(succeeds).toBeTruthy();
      await knexHelper.knex('user').delete('*');
    });
  });

  /* describe('findById', () => {
    it('should return true on update with success', async () => {
      const succeeds = await sut.update(mockParams());
      expect(succeeds).toBeTruthy();
      await knexHelper.knex('user').delete('*');
    });
  }); */
});
