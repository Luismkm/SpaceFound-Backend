import { knexHelper } from '@/infra/database/helpers';
import { RatePostgresRepository } from '@/infra/database/postgres/rate/RatePostgresRepository';

let sut: RatePostgresRepository;

describe('Rate Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new RatePostgresRepository();
  });

  describe('create()', () => {
    it('should return an rate on create ok', async () => {
      const rate = await sut.create({
        id: 'any_uuid',
        userId: 'any_uuid',
        providerId: 'any_uuid',
        star: 1,
        comment: 'any_comment',
        createdAt: new Date(),
      });
      expect(rate).toBe(true);
      await knexHelper.knex('rate').delete('*');
    });
  });
});
