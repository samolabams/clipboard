import Build from '../src/app';
import { getAccessToken } from './helpers';

const app = new Build();

describe('Calculate contract staffs statistics', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return correct values for contract staffs statistics', async () => {
    const response = await app.getInstance().inject({
      method: 'GET',
      url: '/v1/staffs/contract/statistics',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data).toEqual({
      mean: 100000,
      min: 90000,
      max: 110000,
    });
  });
});
