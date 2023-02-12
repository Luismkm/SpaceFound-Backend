import { knexHelper } from '@/infra/database/helpers';
import { AdPostgresRepository } from '@/infra/database/postgres/ad/AdPostgresRepository';
import { mockCreateAdParams } from '@/tests/domain/mocks/mockAd';

let sut: AdPostgresRepository;

describe('AdPostgresRepository', () => {
  beforeAll(() => {
    knexHelper.connect('development');
  });
  beforeEach(() => {
    sut = new AdPostgresRepository();
  });

  it('should return true on create success', async () => {
    const ad = sut.create({
      id: 'any_uuid',
      userId: 'any_uuid',
      title: 'any_title',
      description: 'any_description',
      createdAt: new Date(),
    });
    expect(ad).toBeTruthy();
    // await knexHelper.knex('ad').delete('*');
  });
});
