import request from 'supertest';

import app from '@/main/config/app';

describe('Google Routes', () => {
  describe('GET /auth/callback', () => {
    it('should return 200 on signup with Google provider', async () => {
      await request(app)
        .get('/auth/callback')
        .query({
          code: 'any_code',
        })
        .expect(200);
    });
  });
})
