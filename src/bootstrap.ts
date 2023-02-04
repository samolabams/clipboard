import cors from '@fastify/cors';
import Validator from 'validatorjs';
import fastifySwagger from '@fastify/swagger';
import loggerPlugin from '@shared/utils/logger/plugin';
import { ErrorResponse } from '@shared/utils/response.util';
import Logger from '@shared/utils/logger';
import AppError from '@shared/error/app.error';
import { cwd } from 'process';

function bootstrapApp(fastify) {
  registerThirdPartyModules(fastify);

  registerCustomValidationRules();

  setErrorHandler(fastify);
}

function registerThirdPartyModules(fastify) {
  fastify.register(cors, { origin: true });

  fastify.register(loggerPlugin);

  fastify.register(fastifySwagger, {
    routePrefix: '/doc',
    mode: 'static',
    specification: {
      path: `${cwd()}/${'openapi/spec.yaml'}`,
    },
    exposeRoute: true,
  });
}

function registerCustomValidationRules() {
  // initialize custom validations for validatorjs
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  Validator.register(
    'uuid',
    (value) => {
      return uuidRegex.test(value);
    },
    ':attribute is not a valid UUID',
  );

  Validator.register(
    'name',
    (value) => {
      return /^[a-zA-Z-]{2,100}$/.test(value);
    },
    'The :attribute field is not valid',
  );
}

function setErrorHandler(fastify) {
  fastify.setErrorHandler((err, request, reply) => {
    const statusCode = err.statusCode || 503;
    const message = err instanceof AppError ? err.message : 'We are unable to process your request. please try again';

    Logger.error({ err: err.cause || err });

    return reply.status(statusCode).send(ErrorResponse(message));
  });
}

export default bootstrapApp;
