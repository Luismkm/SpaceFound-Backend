import MockDate from 'mockdate';

import { knexHelper } from '@/infra/database/helpers';
import { ProviderPostgresRepository } from '@/infra/database/postgres/provider/ProviderPostgresRepository';

let sut: ProviderPostgresRepository;

describe('Provider Postgres Repository', () => {
  beforeAll(() => {
    MockDate.set(new Date('2020-10-10T03:00:00.000Z'));
    knexHelper.connect('development');
  });

  beforeEach(() => {
    sut = new ProviderPostgresRepository();
  });

  afterAll(() => {
    MockDate.reset();
  });

  afterEach(async () => {
    await knexHelper.knex('provider').delete('*');
    await knexHelper.knex('rate').delete('*');
  });

  describe('create()', () => {
    it('should return true on create provider with success', async () => {
      const mockProviderParams = {
        id: 'any_uuid',
        name: 'any_name',
        description: 'any_description',
        cnpj: 'any_cnpj',
        serviceId: 1,
        createdAt: new Date(),
        userId: 'any_uuid',
      };
      const isValid = await sut.create(mockProviderParams);
      expect(isValid).toBe(true);
    });
  });

  describe('loadAll()', () => {
    it('should load all providers on success', async () => {
      await knexHelper.knex('provider').insert([{
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
      },
      {
        id: 'any_uuid2',
        description: 'any_description2',
        user_id: 'any_uuid2',
      }]);

      const providers = await sut.loadAll();
      expect(providers).toBeTruthy();
      expect(providers.length).toBe(2);
      expect(providers[0].id).toBeTruthy();
      expect(providers[0].description).toBe('any_description');
      expect(providers[1].description).toBe('any_description2');
    });
  });

  describe('loadById()', () => {
    it('should load provider by id without rates', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      const provider = await sut.loadById('any_uuid');
      expect(provider).toEqual({
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
        averageStars: 0,
        updated_at: null,
      });
    });

    it('should load provider by id with rates', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      await knexHelper.knex('rate').insert([{
        user_id: 'any_uuid',
        provider_id: 'any_uuid',
        star: 2,
        comment: 'any_comment',
        id: 1,
        created_at: new Date(),
      },
      {
        user_id: 'any_uuidw',
        provider_id: 'any_uuid',
        star: 5,
        comment: 'any_comment',
        id: 2,
        created_at: new Date(),
      }]);

      const provider = await sut.loadById('any_uuid');
      expect(provider).toEqual({
        id: 'any_uuid',
        description: 'any_description',
        user_id: 'any_uuid',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
        averageStars: 3.5,
        updated_at: null,
      });
    });
  });
});
