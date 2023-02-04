import Build from '../src/app';
import { getAccessToken } from './helpers';

const app = new Build();

describe('Calculate sub department statistics', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return correct values for sub department statistics', async () => {
    const response = await app.getInstance().inject({
      method: 'GET',
      url: '/v1/staffs/sub-department/statistics',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.data).toEqual({
      Platform: {
        mean: 40099006,
        min: 30,
        max: 200000000,
      },
      Loan: {
        mean: 90000,
        min: 90000,
        max: 90000,
      },
      CustomerOnboarding: {
        mean: 35015,
        min: 30,
        max: 70000,
      },
      Agriculture: {
        mean: 30,
        min: 30,
        max: 30,
      },
    });
  });
});
