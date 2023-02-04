import { getEnv } from './env.config';

const appConfig = {
  app: {
    name: process.env.APP_NAME,
    env: getEnv(),
  },
  server: {
    port: Number(process.env.PORT),
  },
  auth: {
    username: process.env.LOGIN_USERNAME,
    password: String(process.env.LOGIN_PASSWORD),
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    expiry: process.env.JWT_EXPIRES_IN,
  },
};

export default appConfig;
