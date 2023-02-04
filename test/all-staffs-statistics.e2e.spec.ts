import Build from '../src/app';
import { getAccessToken } from './helpers';

const app = new Build();

describe('Calculate all staffs statistics', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return correct values for all staffs statistics', async () => {
    const response = await app.getInstance().inject({
      method: 'GET',
      url: '/v1/staffs/statistics',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data).toEqual({
      mean: 22295010,
      min: 30,
      max: 200000000,
    });
  });
});
