import { FastifyInstance, FastifyPluginOptions } from 'fastify';

export default (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any,
) => {
  fastify.get('/questions', {}, async (request, reply) => {
    return { test: true };
  });

  done();
};
