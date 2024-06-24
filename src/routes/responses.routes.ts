import Fastify, { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { Question, User } from '../types/db.types.js';
import { knex, sql } from '../db/connection.js';
import { Type, TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { app } from '../server.js';
import { executeBuiltQuery } from '../utils/db.utils.js';

export default (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions,
  done: any,
) => {
  app.post(
    '/responses',
    {
      schema: {
        body: Type.Object({
          responses: Type.Array(
            Type.Object({
              questionId: Type.String({ format: 'uuid' }),
              optionIds: Type.Array(Type.String({ format: 'uuid' }), {
                minItems: 1,
              }),
            }),
            { minItems: 1 },
          ),
          userId: Type.String({ format: 'uuid' }),
        }),
      },
    },
    async (request, reply) => {
      const { responses, userId } = request.body;

      await sql.begin(async (sql) => {
        // delete previous responses + get questions
        const deletePreviousResponses = sql`DELETE FROM response WHERE user_id = ${userId}`;
        const getQuestions = sql<
          Pick<Question, 'id' | 'multipleResponses'>[]
        >`SELECT id, multiple_responses FROM question`;
        const [_, questions] = await Promise.all([
          deletePreviousResponses,
          getQuestions,
        ]);

        // ensure all questions are answered
        const responseQuestionIds = responses.map((res) => res.questionId);

        const areAllQuestionsAnswered = questions.every((question) =>
          responseQuestionIds.includes(question.id),
        );

        if (!areAllQuestionsAnswered) {
          return reply.code(400).send({ message: 'answer all questions' });
        }

        // ensure only 1 response is given to questions of that type
        responses.every((response) => {
          // find the question for the given response
          const question = questions.find(
            (question) => question.id === response.questionId,
          );
          if (!question) {
            return reply
              .code(400)
              .send({ message: "responding to question that doesn't exist" });
          }
          if (!question.multipleResponses && response.optionIds.length > 1) {
            return reply.code(400).send({
              message:
                'multiple responses for a question that only accepts a single response',
            });
          }
        });

        // transform responses into format for insertion
        const responsesToInsert = [];
        for (const response of responses) {
          for (const optionId of response.optionIds) {
            responsesToInsert.push({
              userId,
              questionId: response.questionId,
              optionId,
            });
          }
        }

        // insert responses
        try {
          await executeBuiltQuery(
            knex('response').insert(responsesToInsert),
            sql,
          );
        } catch (err: any) {
          const FOREIGN_KEY_VIOLATION_CODE = '23503';
          if (err.code === FOREIGN_KEY_VIOLATION_CODE) {
            reply.code(400).send({ message: 'foreign key violation' });
          }
          console.error(err);
        }
      });

      return reply.code(201).send({ message: 'success' });
    },
  );

  app.get('/responses', async (request, reply) => {
    const responses = await sql`
      WITH response_with_grouped_options AS (
        SELECT 
          r.user_id,
          r.question_id,
          jsonb_agg(r.option_id) AS option_ids
          FROM response AS r
          GROUP BY r.user_id, r.question_id
      )
      SELECT
        ro.user_id,
        jsonb_agg(
          jsonb_build_object(
            'id', ro.question_id,
            'optionIds', ro.option_ids
          )
        ) as questions
      FROM response_with_grouped_options AS ro
      GROUP BY ro.user_id
    `;
    return responses;
  });

  done();
};
