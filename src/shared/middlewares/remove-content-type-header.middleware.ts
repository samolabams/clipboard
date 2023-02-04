import { FastifyReply, FastifyRequest } from 'fastify';

const removeContentTypeHeader = (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply, done) => {
  if (request.method.toLocaleLowerCase() === 'delete') {
    if (
      request.headers['content-type'] &&
      (request.headers['content-length'] === undefined || request.headers['content-length'] === '0')
    ) {
      delete request.headers['content-type'];
    }
  }

  done();
};

export default removeContentTypeHeader;
