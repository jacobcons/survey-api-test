// Import the framework and instantiate it
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import path from 'path';
import autoload from '@fastify/autoload';
import questionsRoutes from './routes/questions.routes.js';
import responsesRoutes from './routes/responses.routes.js';

export const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

app.register(questionsRoutes);
app.register(responsesRoutes);

app.setErrorHandler((error, request, reply) => {
  if (error.statusCode === 500) {
    app.log.error(error);
  }

  if (error.statusCode === 500 && process.env.NODE_ENV! === 'production') {
    return reply.status(500).send({ message: 'internal server error' });
  } else {
    return reply.send(error);
  }
});

// Run the server!
try {
  await app.listen({ port: 3000 });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
