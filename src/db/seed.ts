import { sql } from './connection.js';
import { Question } from '../types/db.types.js';

await sql`TRUNCATE TABLE response CASCADE`;
await sql`TRUNCATE TABLE option CASCADE`;
await sql`TRUNCATE TABLE question CASCADE`;
await sql`TRUNCATE TABLE "user" CASCADE`;

await sql`
  INSERT INTO "user"(name)
  VALUES 
    ('bob'),
    ('john')
`;

const [question] = await sql<Question[]>`
  INSERT INTO question(text, order, multiple_responses)
  VALUES ('Favourite colour?', 1, false)
  RETURNING *
`;
await sql`
  INSERT INTO option(${question.id}, text, order)
  VALUES 
    ('Blue', 1),
    ('Red', 2),
    ('Yellow', 3)
`;

const [question2] = await sql<Question[]>`
  INSERT INTO question(text, order, multiple_responses)
  VALUES ('Places visited', 2, true)
  RETURNING *
`;
await sql`
  INSERT INTO option(${question2.id}, text, order)
  VALUES 
    ('Paris', 1),
    ('London', 2),
    ('New York', 3)
`;

process.exit(0);
