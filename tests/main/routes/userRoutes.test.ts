import request from 'supertest';
import { hash } from 'bcrypt';

import { sign } from 'jsonwebtoken';
import app from '@/main/config/app';
import { knexHelper } from '@/infra/database/helpers';
import authConfig from '@/main/config/auth';

const makeAccesToken = (): string => {
  const userId = 'any_uuid';
  const accountType = 'client'
  const token = sign({ userId, accountType }, authConfig.jwt.secret, {
    subject: userId,
  });
  return token;
};

describe('Login Routes', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });

  afterEach(async () => {
    await knexHelper.knex('user').delete('*');
  });

  describe('POST /signup', () => {
    it('should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any_password',
          passwordConfirmation: 'any_password',
          cityId: 1,
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('123', 12);
      await knexHelper.knex('user').insert({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email@email.com',
        password,
      });
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@email.com',
          password: '123',
        })
        .expect(200);
    });

    it('should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@email.com',
          password: '123',
        })
        .expect(401);
    });
  });

  describe('PUT /user/profile', () => {
    it('should return 204 on update user profile', async () => {
      await knexHelper.knex('user').insert({
        id: 'any_uuid',
        name: 'any_name',
        email: 'any_email',
        city_id: 1,
        created_at: new Date(),
      });
      const accessToken = makeAccesToken();
      const a = await request(app)
        .put('/api/user/profile')
        .set('x-access-token', accessToken)
        .send({
          name: 'updated_name',
          email: 'updated_email@email.com',
          cityId: 2,
        })
        .expect(204);
    });
  });
});
