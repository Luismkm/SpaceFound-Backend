import { faker } from '@faker-js/faker';
import { knexHelper } from '@/infra/database/helpers';

import { UserPostgresRepository } from '@/infra/database/postgres/user/UserPostgresRepository';
import { UpdateUserProfileRepository } from '@/data/protocols';
import { mockUser } from '@/tests/domain/mocks';

let sut: UserPostgresRepository;

const mockParams = ():UpdateUserProfileRepository.Params => ({
  accountId: faker.string.uuid(),
  name: faker.person.fullName(),
  email: faker.internet.email(),
  cityId: 1,
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
    it('should return true on create ok', async () => {
      const account = await sut.create(mockUser());
      expect(account).toBeTruthy();
    });
  });

  describe('updateAvatar', () => {
    it('should return true on updateAvatar with ok', async () => {
      const { id, name, email, password, avatar, cityId, createdAt } = mockUser()
      await knexHelper.knex('user').insert({ id, name, email, password, avatar, id_city: cityId, created_at: createdAt });
      const succeeds = await sut.updateAvatar({ accountId: id, filename: 'other_avatar' })
      const user = await sut.findById(id)
      expect(succeeds).toBeTruthy();
      expect(user.avatar).toBe('other_avatar')
      expect(user.updatedAt).toBeTruthy()
    });
  });

  describe('update', () => {
    it('should return true on update with ok', async () => {
      const params = mockParams()
      const { id, name, email, password, avatar, cityId, createdAt } = mockUser()
      await knexHelper.knex('user').insert({ id, name, email, password, avatar, id_city: cityId, created_at: createdAt });
      const succeeds = await sut.update({ ...params, accountId: id });
      const user = await sut.findById(id)
      expect(succeeds).toBeTruthy();
      expect(user.name).toBe(params.name);
      expect(user.email).toBe(params.email);
      expect(user.updatedAt).toBeTruthy()
    });
  });

  describe('loadByEmail', () => {
    it('should return an account on loadByEmail ok', async () => {
      const { id, name, email, password, avatar, cityId, createdAt } = mockUser()
      await knexHelper.knex('user').insert({ id, name, email, password, avatar, id_city: cityId, created_at: createdAt });
      const account = await sut.loadByEmail(email);
      expect(account.name).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe(name);
      expect(account.email).toBe(email);
      expect(account.password).toBe(password);
    });

    it('should return null if loadByEmail fails', async () => {
      const account = await sut.loadByEmail(faker.internet.email());
      expect(account).toBeFalsy();
    });
  });

  describe('findById', () => {
    it('should return a user by findById', async () => {
      const { id, name, email, password, avatar, cityId, createdAt } = mockUser()
      await knexHelper.knex('user').insert({ id, name, email, password, avatar, id_city: cityId, created_at: createdAt });
      const succeeds = await sut.findById(id);
      expect(succeeds).toBeTruthy();
      expect(succeeds.id).toBe(id)
    });
  });
});
