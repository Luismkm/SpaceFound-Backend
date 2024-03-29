import { knexHelper } from '@/infra/database/helpers';
import { AdPostgresRepository } from '@/infra/database/postgres/ad/AdPostgresRepository';

let sut: AdPostgresRepository;

describe('AdPostgresRepository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new AdPostgresRepository();
  });

  describe('create()', () => {
    it('should return true on create ok', async () => {
      const ad = await sut.create({
        id: 'any_uuid',
        accountId: 'any_uuid',
        accountType: 'any_account',
        title: 'any_title',
        description: 'any_description',
        serviceId: '1',
        createdAt: new Date(),
      });
      expect(ad).toBeTruthy();
      await knexHelper.knex('ad').delete('*');
    });
  })

  describe('listByAccount()', () => {
    it('should return ads on ok', async () => {
      await sut.create({
        id: 'any_uuid',
        accountId: 'any_uuid',
        accountType: 'any_account',
        title: 'any_title',
        description: 'any_description',
        serviceId: '1',
        createdAt: new Date(),
      });

      const ad = await sut.listByAccount({
        accountId: 'any_uuid',
      });
      expect(ad[0].id).toBe('any_uuid')
      await knexHelper.knex('ad').delete('*');
    });
  })
});
