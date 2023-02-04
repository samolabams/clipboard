import Build from '../src/app';
import { getAccessToken, getTestPayload } from './helpers';

const app = new Build();

describe('Add new staff to dataset', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return validation error (400) if add staff payload is invalid', async () => {
    const response = await app.getInstance().inject({
      method: 'POST',
      url: '/v1/staffs',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(body.success).toBe(false);
  });

  it('should return success (201) with staff details if payload is valid', async () => {
    const payload = getTestPayload();

    const response = await app.getInstance().inject({
      method: 'POST',
      url: '/v1/staffs',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      payload,
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(201);
    expect(body.success).toBe(true);
    expect(body.data.id).toBeDefined();
    expect(body.data).toMatchObject(payload);
  });
});
