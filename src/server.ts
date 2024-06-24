// Import the framework and instantiate it
import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import questionsRoutes from './routes/questions.routes.js';
import responsesRoutes from './routes/responses.routes.js';

export const app = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
    },
  },
}).withTypeProvider<TypeBoxTypeProvider>();

// plugins
app.register(await import('@fastify/swagger'), {
  openapi: {
    openapi: '3.0.0',
    info: {
      title: 'Survey API test',
      description: 'Mini survey api to test some new libraries out',
      version: '0.1.0',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development',
      },
    ],
    tags: [{ name: 'questions' }, { name: 'responses' }],
  },
});
app.register(await import('@scalar/fastify-api-reference'), {
  routePrefix: '/reference',
});

// routes
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
