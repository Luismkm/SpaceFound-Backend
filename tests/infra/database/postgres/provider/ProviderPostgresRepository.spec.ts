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
    await knexHelper.knex('providers').delete('*');
  });

  describe('create()', () => {
    it('should create a provider on success', async () => {
      await sut.create({
        id: 'any_uuid',
        idBusiness: 1,
        description: 'any_description',
        idUser: 'any_uuid',
      });
      const provider = await knexHelper.knex('providers').where({ id_user: 'any_uuid' }).select('*');
      expect(provider[0]).toBeTruthy();
    });
  });

  describe('loadAll()', () => {
    it('should load all providers on success', async () => {
      await knexHelper.knex('providers').insert({
        id: 'any_uuid',
        id_business: 1,
        description: 'any_description',
        id_user: 'any_uuid',
      });

      await knexHelper.knex('providers').insert({
        id: 'other_uuid',
        id_business: 2,
        description: 'other_description',
        id_user: 'other_uuid',
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
      await knexHelper.knex('providers').insert({
        id: 'any_uuid',
        id_business: 1,
        description: 'any_description',
        id_user: 'any_uuid',
      });

      const provider = await sut.loadById('any_uuid');
      expect(provider).toBeTruthy();
    });
  });
});
