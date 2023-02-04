import Build from '../src/app';
import { getAccessToken } from './helpers';

const app = new Build();

describe('Calculate department statistics', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return correct values for department statistics', async () => {
    const response = await app.getInstance().inject({
      method: 'GET',
      url: '/v1/staffs/department/statistics',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data).toEqual({
      Engineering: {
        mean: 40099006,
        min: 30,
        max: 200000000,
      },
      Banking: {
        mean: 90000,
        min: 90000,
        max: 90000,
      },
      Operations: {
        mean: 35015,
        min: 30,
        max: 70000,
      },
      Administration: {
        mean: 30,
        min: 30,
        max: 30,
      },
    });
  });
});
