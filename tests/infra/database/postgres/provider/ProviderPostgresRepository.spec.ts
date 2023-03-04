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

  /*   describe('create()', () => {
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
 */
  describe('loadAll()', () => {
    it('should load all providers on ok', async () => {
      await knexHelper.knex('provider').insert([{
        id: 'any_uuid',
        description: 'any_description',
      },
      {
        id: 'any_uuid2',
        description: 'any_description2',
      }]);

      const providers = await sut.loadAll();
      expect(providers).toBeTruthy();
      expect(providers.length).toBe(2);
      expect(providers[0].accountId).toBeTruthy();
      expect(providers[0].description).toBe('any_description');
      expect(providers[1].description).toBe('any_description2');
    });
  });

  /*   describe('loadById()', () => {
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
    });
  }); */

  /*   describe('updateAvatar', () => {
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
      const succeeds = await sut.updateAvatar({ accountId: 'any_uuid', fileName: 'other_avatar' })
      const provider = await sut.loadById('any_uuid')
      expect(succeeds).toBeTruthy();
      expect(provider.avatar).toBe('other_avatar')
    });
  }); */

/*   describe('findById()', () => {
    it('should return a provider by findById', async () => {
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
  }) */
});
