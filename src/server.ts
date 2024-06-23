// Import the framework and instantiate it
import Fastify from 'fastify';
import { TypeBoxTypeProvider, Type } from '@fastify/type-provider-typebox';

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.route({
  method: 'GET',
  url: '/',
  schema: {
    querystring: Type.Object({
      name: Type.String(),
    }),
  },
  handler: async (request) => {
    return { hello: request.query.name };
  },
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
