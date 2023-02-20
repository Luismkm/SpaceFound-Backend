import { knexHelper } from '@/infra/database/helpers';

import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { UpdateUserProfileRepository } from '@/data/protocols';
import { mockUser } from '@/tests/domain/mocks';

let sut: UserPostgresRepository;

const mockParams = ():UpdateUserProfileRepository.Params => ({
  accountId: 'any_uuid',
  name: 'other_name',
  email: 'other_email',
  cityId: 2,
});

describe('User Postgres Repository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new UserPostgresRepository();
  });

  afterEach(async () => {
    await knexHelper.knex('user').delete('*');
  })

  describe('create()', () => {
    it('should return true on create success', async () => {
      const account = await sut.create(mockUser());
      expect(account).toBeTruthy();
    });
  });

  describe('updateAvatar', () => {
    it('should return true on updateAvatar with success', async () => {
      await knexHelper.knex('user').insert({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'any_avatar',
        city_id: 1,
        created_at: new Date(),
      });
      const succeeds = await sut.updateAvatar({ accountId: 'any_uuid', fileName: 'other_avatar' })
      const user = await sut.findById('any_uuid')
      expect(succeeds).toBeTruthy();
      expect(user.avatar).toBe('other_avatar')
    });
  });

  describe('update', () => {
    it('should return true on update with success', async () => {
      await knexHelper.knex('user').insert({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'any_avatar',
        city_id: 1,
        created_at: new Date(),
      });
      const succeeds = await sut.update(mockParams());
      const user = await sut.findById('any_uuid')
      expect(succeeds).toBeTruthy();
      expect(user.name).toBe('other_name')
      expect(user.email).toBe('other_email')
      expect(user.cityId).toBe(2)
    });
  });

  describe('loadByEmail', () => {
    it('should return an account on loadByEmail success', async () => {
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

  describe('findById', () => {
    it('should return a user by findById', async () => {
      await knexHelper.knex('user').insert({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        avatar: 'any_avatar',
        city_id: 1,
        created_at: new Date(),
      });
      const succeeds = await sut.findById('any_uuid');
      expect(succeeds).toBeTruthy();
      expect(succeeds.id).toBe('any_uuid')
    });
  });
});
