import { FastifyReply, FastifyRequest } from 'fastify';
import Validator from 'validatorjs';
import { ErrorResponse } from '../utils/response.util';
import ObjectLiteral from '../types/object-literal.type';

type Error = {
  field: string;
  message: string;
};

const validate = (rules: ObjectLiteral, validationMessages?: ObjectLiteral) => {
  return (request: FastifyRequest, reply: FastifyReply, done) => {
    const validation = new Validator(request.body, rules, validationMessages);

    const errors = validation.errors.all();

    if (validation.fails()) {
      return reply.code(400).send(ErrorResponse('Your payload is invalid', createValidationError(errors)));
    }

    done();
  };
};

const createValidationError = (validationError: []) => {
  const errors: Error[] = [];

  for (const [key, value] of Object.entries(validationError)) {
    errors.push({
      field: key,
      message: value[0],
    });
  }

  return errors;
};

export default validate;
