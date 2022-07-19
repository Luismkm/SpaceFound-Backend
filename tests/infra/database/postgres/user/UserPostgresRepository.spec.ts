import { knexHelper } from '@/infra/database/helpers';

import { mockAccount } from '@/tests/domain/mocks';
import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { UpdateUserProfileRepository } from '@/data/protocols';

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
  describe('update', () => {
    it('should return true on update with success', async () => {
      const succeeds = await sut.update(mockParams());
      expect(succeeds).toBeTruthy();
      await knexHelper.knex('user').delete('*');
    });
  });
});
