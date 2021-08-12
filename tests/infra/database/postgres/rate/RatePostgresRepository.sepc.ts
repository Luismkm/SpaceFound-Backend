import { knexHelper } from '@/infra/database/helpers';
import { RatePostgresRepository } from '@/infra/database/postgres/rate/RatePostgresRepository';

import { mockRateDTO } from '@/tests/domain/mocks/mockRate';

let sut: RatePostgresRepository;

describe('Rate Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new RatePostgresRepository();
  });

  describe('create()', () => {
    it('should return an rate on create success', async () => {
      const rate = await sut.create(mockRateDTO());
      expect(rate).toBeTruthy();
      await knexHelper.knex('rates').delete('*');
    });
  });
});
