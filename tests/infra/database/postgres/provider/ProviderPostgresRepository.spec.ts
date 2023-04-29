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
    await knexHelper.knex('service').delete('*');
    await knexHelper.knex('provider_service').delete('*');
  });

  describe('create()', () => {
    it('should return true on create provider with ok', async () => {
      const mockProviderParams = {
        id: 'any_uuid',
        name: 'any_name',
        description: 'any_description',
        email: 'any_email',
        cnpj: 'any_cnpj',
        serviceId: 1,
        createdAt: new Date(),
      };
      const isValid = await sut.create(mockProviderParams);
      expect(isValid).toBe(true);
    });
  });

  describe('loadAll()', () => {
    it('should load all providers on ok', async () => {
      await knexHelper.knex('provider').insert([{
        id: 'any_uuid',
        name: 'any_name',
        avatar: 'any_avatar',
        description: 'any_description',
      },
      {
        id: 'any_uuid2',
        name: 'any_name2',
        avatar: 'any_avatar2',
        description: 'any_description2',
      }]);

      await knexHelper.knex('service').insert([{
        id: 1,
        name: 'any_service',
      },
      ]);

      await knexHelper.knex('provider_service').insert([{
        provider_id: 'any_uuid',
        service_id: 1,
      },
      {
        provider_id: 'any_uuid2',
        service_id: 1,
      }]);

      await knexHelper.knex('rate').insert([{
        provider_id: 'any_uuid',
        star: 5,
      },
      {
        provider_id: 'any_uuid',
        star: 0,
      },
      {
        provider_id: 'any_uuid2',
        star: 0,
      },
      {
        provider_id: 'any_uuid2',
        star: 0,
      }]);

      const providers = await sut.loadAll();
      expect(providers).toBeTruthy();
      expect(providers.length).toBe(2);
      expect(providers[0].providerId).toBe('any_uuid')
      expect(providers[0].name).toBe('any_name');
      expect(providers[0].description).toBe('any_description');
      expect(providers[0].avatar).toBe('any_avatar');
      expect(providers[0].average).toBe(2.5);
      expect(providers[0].service).toBe('any_service');
      expect(providers[1].average).toBe(0);
    });
  });

  describe('loadProfileById', () => {
    it('should return a provider profile with 0 rate', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        name: 'any_name',
        email: 'any_email',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      const provider = await sut.loadProfileById('any_uuid')
      expect(provider).toEqual({
        id: 'any_uuid',
        name: 'any_name',
        avatar: null,
        description: 'any_description',
        email: 'any_email',
        cnpj: 'any_cnpj',
        createdAt: new Date(),
        updatedAt: null,
        averageStars: 0,
      })
    })

    it('should load provider PROFILE by id with rates', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        email: 'any_email',
        avatar: 'any_avatar',
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
        user_id: 'any_uuid',
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
        email: 'any_email',
        avatar: 'any_avatar',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
        averageStars: 3.5,
        updated_at: null,
      });
    })
  })

  describe('loadById()', () => {
    it('should load provider by id without rates', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        avatar: 'any_avatar',
        name: 'any_name',
        email: 'any_email',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      const provider = await sut.loadById('any_uuid');
      expect(provider).toEqual({
        id: 'any_uuid',
        description: 'any_description',
        avatar: 'any_avatar',
        name: 'any_name',
        email: 'any_email',
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
        email: 'any_email',
        avatar: 'any_avatar',
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
        user_id: 'any_uuid',
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
        email: 'any_email',
        avatar: 'any_avatar',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
        averageStars: 3.5,
        updated_at: null,
      });
    })
  });

  describe('updateAvatar', () => {
    it('should return true on updateAvatar with ok', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        email: 'any_email',
        avatar: 'any_avatar',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });
      const succeeds = await sut.updateAvatar({ accountId: 'any_uuid', filename: 'other_avatar' })
      const provider = await sut.loadById('any_uuid')
      expect(succeeds).toBeTruthy();
      expect(provider.avatar).toBe('other_avatar')
    });
  });

  describe('loadById()', () => {
    it('should return a provider by loadById', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        avatar: 'any_path',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      const provider = await sut.loadById('any_uuid')
      expect(provider).toBeTruthy()
      expect(provider.id).toBe('any_uuid')
      expect(provider.avatar).toBe('any_path')
    })
  })

  describe('checkProviderById()', () => {
    it('should return false if checkProviderById not find a provider', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        avatar: 'any_path',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      const provider = await sut.checkProviderById('other_uuid')
      expect(provider).toBe(false)
    })

    it('should return true if checkProviderById find a provider', async () => {
      await knexHelper.knex('provider').insert({
        id: 'any_uuid',
        description: 'any_description',
        avatar: 'any_path',
        name: 'any_name',
        cnpj: 'any_cnpj',
        created_at: new Date(),
      });

      const provider = await sut.checkProviderById('any_uuid')
      expect(provider).toBe(true)
    })
  })
});
