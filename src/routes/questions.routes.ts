import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Question } from '../types/db.types.js';
import { sql } from '../db/connection.js';
import { app } from '../server.js';

export default (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any,
) => {
  app.get(
    '/questions',
    {
      schema: {
        tags: ['questions'],
        description: 'get all questions and their corresponding options',
      },
    },
    async (request, reply) => {
      const questions = await sql<Question[]>`
      SELECT 
        q.id, 
        q.text,
        q.multiple_responses, 
        jsonb_agg(
          jsonb_build_object(
            'id', o.id,
            'text', o.text
          ) ORDER BY o.position
        ) AS options
      FROM question AS q
      JOIN option AS o ON q.id = o.question_id
      GROUP BY q.id, q.text, q.multiple_responses, q.position
      ORDER BY q.position
    `;

      return questions;
    },
  );

  done();
};
