import { knexHelper } from '@/infra/database/helpers';

import { GoogleProviderPostgresRepository } from '@/infra/database/postgres/login/GoogleProviderPostgresRepository';

let sut: GoogleProviderPostgresRepository

describe('Google Provider Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new GoogleProviderPostgresRepository();
  });

  afterEach(async () => {
    await knexHelper.knex('user').delete('*');
  })

  describe('create()', () => {
    it('should return true on create ok', async () => {
      const account = await sut.create({
        id: 'any_id',
        name: 'any_name',
        email: 'any_email',
        picture: 'any_url',
      });
      expect(account).toBeTruthy();
    });
  });

  describe('loadByEmail', () => {
    it('should return an account on loadByEmail', async () => {
      await knexHelper.knex('user').insert({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'any_avatar',
        city_id: 1,
        created_at: new Date(),
      });
      const account = await sut.loadByEmail('any_email');
      expect(account.name).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email');
      expect(account.password).toBe('any_password');
    });

    it('should return null if loadByEmail fails', async () => {
      const account = await sut.loadByEmail('any_email');
      expect(account).toBeFalsy();
    });
  });
})
