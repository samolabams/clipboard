import { injectable } from 'tsyringe';
import AccessTokenService from './access-token.service';
import httpStatus from 'http-status';
import LoginDto from '../dtos/login.dto';
import { comparePassword } from '../utils/password.util';
import appConfig from '@config/app.config';
import AppError from '@shared/error/app.error';

@injectable()
class LoginService {
  constructor(private readonly accessTokenService: AccessTokenService) {}

  async login({ username, password }: LoginDto) {
    if ((await this.isLoginCredentialsValid(username, password)) === false) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'Your login credential is invalid');
    }

    return await this.accessTokenService.generateAccessToken(username);
  }

  private async isLoginCredentialsValid(username: string, password: string) {
    if (username !== appConfig.auth.username) {
      return false;
    }

    return await comparePassword(password, appConfig.auth.password);
  }

  logout(userId: string) {
    this.accessTokenService.invalidateAccessToken(userId);
  }
}

export default LoginService;
