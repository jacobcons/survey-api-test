// Import the framework and instantiate it
import Fastify from 'fastify';
import { TypeBoxTypeProvider, Type } from '@fastify/type-provider-typebox';
import path from 'path';
import { fastifyAutoload } from '@fastify/autoload';

const fastify = Fastify({
  logger: true,
}).withTypeProvider<TypeBoxTypeProvider>();

fastify.register(fastifyAutoload, {
  dir: path.join(import.meta.dirname, 'routes'),
  dirNameRoutePrefix: false,
});

// Run the server!
try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

/*
GET /questions

POST /responses
GET /responses?userId=


 */
