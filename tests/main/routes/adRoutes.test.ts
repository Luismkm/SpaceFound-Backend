import request from 'supertest';
import { sign } from 'jsonwebtoken';

import app from '@/main/config/app';
import { knexHelper } from '@/infra/database/helpers';
import authConfig from '@/main/config/auth';

const makeAccesToken = (): string => {
  const id = 'any_uuid';
  const token = sign({ sub: id }, authConfig.jwt.secret);
  return token;
};

describe('Ad Routes', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });

  afterEach(async () => {
    await knexHelper.knex('ad').delete('*');
  });
  describe('POST /ad', () => {
    it('should return 204 on create ad with ok', async () => {
      const accessToken = makeAccesToken();
      await request(app)
        .post('/api/ad')
        .set('x-access-token', accessToken)
        .send({
          userId: 'any_uuid',
          title: 'any_title',
          serviceId: '1',
          description: 'any_description',
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

  describe('GET /ad', () => {
    it('should return 200 on create ad with ok', async () => {
      const accessToken = makeAccesToken();
      await request(app)
        .get('/api/ad')
        .set('x-access-token', accessToken)
        .send({
          userId: 'any_uuid',
        })
        .expect(204);
    });

    it('should return 200 on create ad with ok', async () => {
      const accessToken = makeAccesToken();
      await request(app)
        .post('/api/ad')
        .set('x-access-token', accessToken)
        .send({
          userId: 'any_uuid',
          title: 'any_title',
          serviceId: '1',
          description: 'any_description',
        })

      await request(app)
        .get('/api/ad')
        .set('x-access-token', accessToken)
        .send({
          userId: 'any_uuid',
        })
        .expect(200);
    });
  })
});
