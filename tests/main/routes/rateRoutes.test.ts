import request from 'supertest';
import { sign } from 'jsonwebtoken';

import app from '@/main/config/app';
import { knexHelper } from '@/infra/database/helpers';
import authConfig from '@/main/config/auth';

const makeAccesToken = (): string => {
  const userId = 'any_uuid';
  const token = sign({ userId }, authConfig.jwt.secret, {
    subject: userId,
  });
  return token;
};

describe('Rate Routes', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });

  afterEach(async () => {
    await knexHelper.knex('provider').delete('*');
  });
  describe('POST /rate', () => {
    it('should return 204 on create rate', async () => {
      const accessToken = makeAccesToken();
      await request(app)
        .post('/api/rate')
        .set('x-access-token', accessToken)
        .send({
          userId: 'any_uuid',
          providerId: 'any_uuid',
          star: 1,
          comment: 'any_comment',
        })
        .expect(204);
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
