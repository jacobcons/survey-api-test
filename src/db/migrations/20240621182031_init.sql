-- +goose Up
-- +goose StatementBegin
CREATE TABLE "user" (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL
);

CREATE TABLE question (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text TEXT NOT NULL,
  position INT NOT NULL,
  multiple_responses BOOLEAN NOT NULL

);

CREATE TABLE option (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES question(id) ON DELETE CASCADE,
  text TEXT NOT NULL,
  position INT NOT NULL,
  UNIQUE (id, question_id)
);

CREATE TABLE response (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES question(id) ON DELETE CASCADE,
  option_id UUID NOT NULL REFERENCES option(id) ON DELETE CASCADE,
  UNIQUE (user_id, question_id, option_id),
  CONSTRAINT fk_option_question FOREIGN KEY (option_id, question_id) REFERENCES option(id, question_id) ON DELETE CASCADE
);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE response;
DROP TABLE option;
DROP TABLE question;
DROP TABLE "user";
-- +goose StatementEnd
