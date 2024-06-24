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
  INSERT INTO question(text, position, multiple_responses)
  VALUES ('Favourite colour?', 1, false)
  RETURNING *
`;
await sql`
  INSERT INTO option(question_id, text, position)
  VALUES 
    (${question.id}, 'Blue', 1),
    (${question.id}, 'Red', 2),
    (${question.id}, 'Yellow', 3)
`;

const [question2] = await sql<Question[]>`
  INSERT INTO question(text, position, multiple_responses)
  VALUES ('Places visited', 2, true)
  RETURNING *
`;
await sql`
  INSERT INTO option(question_id, text, position)
  VALUES 
    (${question2.id}, 'Paris', 1),
    (${question2.id}, 'London', 2),
    (${question2.id}, 'New York', 3)
`;

console.log('asdf');
process.exit(0);
