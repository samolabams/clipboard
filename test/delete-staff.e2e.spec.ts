import { v4 as uuidv4 } from 'uuid';
import Build from '../src/app';
import { getAccessToken, getTestPayload } from './helpers';

const app = new Build();

describe('Delete record from dataset', () => {
  let accessToken: string;

  beforeAll(async () => {
    accessToken = await getAccessToken(app);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return error (400) if id is invalid', async () => {
    const response = await app.getInstance().inject({
      method: 'DELETE',
      url: `/v1/staffs/${uuidv4()}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(400);
    expect(body.success).toBe(false);
  });

  it('should return success (200) if id is valid and record has been deleted', async () => {
    const addStaffResponse = await app.getInstance().inject({
      method: 'POST',
      url: '/v1/staffs',
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      payload: getTestPayload(),
    });

    const {
      data: { id },
    } = JSON.parse(addStaffResponse.body);

    const response = await app.getInstance().inject({
      method: 'DELETE',
      url: `/v1/staffs/${id}`,
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });

    const body = JSON.parse(response.body);

    expect(response.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.id).toBe(id);
  });
});
