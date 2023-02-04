import { FastifyPluginAsync } from 'fastify';
import { container } from 'tsyringe';
import AuthController from './controllers/auth.controller';
import { loginValidationRules } from './validations/login.validation';
import validate from '@shared/middlewares/validator.middleware';
import authMiddleware from '@shared/middlewares/auth.middleware';

const authController = container.resolve(AuthController);

const authRoute: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: 'POST',
    url: '/auth/login',
    preValidation: [validate(loginValidationRules)],
    handler: authController.login,
  });

  fastify.route({
    method: 'POST',
    url: '/auth/logout',
    onRequest: authMiddleware,
    handler: authController.logout,
  });
};

export default authRoute;
