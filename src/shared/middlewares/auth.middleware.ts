import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import AccessTokenService from '../../modules/auth/services/access-token.service';
import { extractTokenFromRequestHeader } from '../../modules/auth/utils/jwt.util';
import appConfig from '@config/app.config';
import { ErrorResponse } from '@shared/utils/response.util';

const accessTokenService = container.resolve(AccessTokenService);

const authMiddleware = async (req: FastifyRequest, res: FastifyReply, done) => {
  try {
    const token = extractTokenFromRequestHeader(req);
    if (!token) return returnError(res);

    const payload = jwt.verify(token, appConfig.jwt.secret);

    if (accessTokenExist(payload) === false) {
      return returnError(res);
    }

    (req as any).user = payload.user;

    done();
  } catch (err) {
    return returnError(res);
  }
};

const returnError = (res) => {
  res.code(httpStatus.UNAUTHORIZED).send(ErrorResponse('Your auth token is invalid'));
};

const accessTokenExist = (payload) => {
  return accessTokenService.accessTokenExist(payload.user?.id, payload.jti);
};

export default authMiddleware;
