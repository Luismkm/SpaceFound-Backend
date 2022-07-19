import { knexHelper } from '@/infra/database/helpers';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

let sut: ProviderPostgresRepository;

describe('Provider Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new ProviderPostgresRepository();
  });
  afterEach(async () => {
    await knexHelper.knex('provider').delete('*');
  });

  describe('create()', () => {
    it('should create a provider on success', async () => {
      await sut.create({
        id: 'any_uuid',
        name: 'any_name',
        description: 'any_description',
        cnpj: 'any_cnpj',
        serviceId: 1,
        createdAt: new Date(),
        userId: 'any_uuid',
      });
      const provider = await knexHelper.knex('provider').where({ user_id: 'any_uuid' }).select('*');
      expect(provider[0]).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    it('should load all providers on success', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
      });

      await knexHelper.knex('provider').insert({
        id: 'other_uuid',
        description: 'other_description',
        user_id: 'other_uuid',
      });

      const providers = await sut.loadAll();
      expect(providers).toBeTruthy();
      expect(providers.length).toBe(2);
      expect(providers[0].id).toBeTruthy();
      expect(providers[0].description).toBe('any_description');
      expect(providers[1].description).toBe('other_description');
    });

    it('should load empty list', async () => {
      const providers = await sut.loadAll();
      expect(providers.length).toEqual(0);
    });
  });

  describe('loadById()', () => {
    it('should load provider by id', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
      });

      const provider = await sut.loadById('any_uuid');
      expect(provider).toBeTruthy();
    });
  });
});
