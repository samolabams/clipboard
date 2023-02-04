export const getAccessToken = async (app) => {
  const response = await app.getInstance().inject({
    method: 'POST',
    url: '/v1/auth/login',
    payload: { username: process.env.LOGIN_USERNAME, password: 'secret' },
  });

  const body = JSON.parse(response.body);

  return body.data.accessToken;
};

export const getTestPayload = () => {
  return {
    name: 'Sam',
    salary: '25000',
    currency: 'USD',
    department: 'Engineering',
    on_contract: true,
    sub_department: 'Platform',
  };
};
