import { singleton } from 'tsyringe';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import ms from 'ms';
import appConfig from '@config/app.config';

@singleton()
class AccessTokenService {
  private validTokens = {};

  async generateAccessToken(username) {
    const id = uuidv4();
    const jwtid = uuidv4();
    const expiresIn = appConfig.jwt.expiry;
    const expiresInMs = ms(expiresIn);

    const accessToken = jwt.sign({ user: { id, username } }, appConfig.jwt.secret, {
      algorithm: 'HS256',
      expiresIn,
      notBefore: '0ms',
      jwtid,
    });

    this.validTokens[id] = jwtid;

    return { accessToken, expiresIn: expiresInMs };
  }

  accessTokenExist(userId: string, jwtid: string) {
    return this.validTokens[userId] === jwtid;
  }

  async invalidateAccessToken(userId: string) {
    delete this.validTokens[userId];
  }
}

export default AccessTokenService;
