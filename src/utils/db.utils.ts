import { sql } from '../db/connection.js';
import { Knex } from 'knex';
import { Sql } from 'postgres';

export const executeBuiltQuery = <T extends any[]>(
  builtQuery: Knex.QueryBuilder,
  sql: Sql,
) => {
  const { sql: query, bindings } = builtQuery.toSQL().toNative();
  return sql.unsafe<T>(query, bindings as any[]);
};
