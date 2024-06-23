import { sql } from './connection.js';

await sql`TRUNCATE TABLE response CASCADE`;
await sql`TRUNCATE TABLE option CASCADE`;
await sql`TRUNCATE TABLE question CASCADE`;
await sql`TRUNCATE TABLE "user" CASCADE`;

await sql`
  INSERT INTO "user"(name)
  VALUES ('bob')
`;

process.exit(0);
