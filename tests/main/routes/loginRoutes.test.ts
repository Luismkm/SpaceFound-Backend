import request from 'supertest';

import app from '@/main/config/app';
import { knexHelper } from '@/infra/database/helpers';

describe('Login Routes', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });

  beforeEach(async () => {
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
});
