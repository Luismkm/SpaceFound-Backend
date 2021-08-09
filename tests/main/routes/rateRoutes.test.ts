import request from 'supertest';

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
  describe('POST /rate', () => {
    it('should return 200 on create rate', async () => {
      const accessToken = makeAccesToken();
      const a = await request(app)
        .post('/api/rate')
        .set('x-access-token', accessToken)
        .send({
          idProvider: 'any_uuid',
          star: 1,
          comment: 'any_comment',
        })
        .expect(200);
    });

    it('Should return 401 on create rate without accessToken', async () => {
      await request(app)
        .post('/api/rate')
        .send({
          idProvider: 'any_uuid',
          star: 1,
          comment: 'any_comment',
        })
        .expect(401);
    });
  });
});
