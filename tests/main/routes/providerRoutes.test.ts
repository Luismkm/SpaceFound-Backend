import request from 'supertest';
import { hash } from 'bcrypt';

import app from '@/main/config/app';
import { knexHelper } from '@/infra/database/helpers';
import { sign } from 'jsonwebtoken';
import authConfig from '@/main/config/auth';

const makeAccesToken = (): string => {
  const id = 'any_uuid';
  const token = sign({}, authConfig.jwt.secret, {
    subject: id,
  });
  return token;
};

describe('Login Routes', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });

  afterEach(async () => {
    await knexHelper.knex('providers').delete('*');
  });
  describe('POST /provider', () => {
    it('should return 200 on create provider', async () => {
      const accessToken = makeAccesToken();
      await request(app)
        .post('/api/provider')
        .set('x-access-token', accessToken)
        .send({
          idBusiness: 1,
          description: 'any_description',
        })
        .expect(200);
    });

    it('Should return 401 on create provider without accessToken', async () => {
      await request(app)
        .post('/api/provider')
        .send({
          idBusiness: 1,
          description: 'any_description',
        })
        .expect(401);
    });
  });
});
