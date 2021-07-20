import request from 'supertest';
import { hash } from 'bcrypt';

import app from '@/main/config/app';
import { knexHelper } from '@/infra/database/helpers';

describe('Login Routes', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });

  afterEach(async () => {
    await knexHelper.knex('users').delete('*');
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
        })
        .expect(200);
    });
  });

  describe('POST /login', () => {
    it('should return 200 on login', async () => {
      const password = await hash('123', 12);
      await knexHelper.knex('users').insert({
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
});
