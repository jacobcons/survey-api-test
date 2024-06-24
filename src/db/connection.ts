import postgres from 'postgres';
import Knex from 'knex';
import knexStringcase from 'knex-stringcase';

export const sql = postgres(process.env.DATABASE_URL!, {
  transform: postgres.camel,
});

export const knex = Knex(
  knexStringcase({
    client: 'pg',
  }),
);
