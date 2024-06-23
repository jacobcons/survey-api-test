/* tslint:disable */
/* eslint-disable */


/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was automatically generated by pg-to-ts v.4.1.1
 * $ pg-to-ts generate -c postgresql://username:password@localhost:5432/survey-test -t goose_db_version -t option -t question -t response -t user -s public
 *
 */


export type Json = unknown;

// Table goose_db_version
export interface GooseDbVersion {
  id: number;
  version_id: number;
  is_applied: boolean;
  tstamp: Date | null;
}
export interface GooseDbVersionInput {
  id?: number;
  version_id: number;
  is_applied: boolean;
  tstamp?: Date | null;
}
const goose_db_version = {
  tableName: 'goose_db_version',
  columns: ['id', 'version_id', 'is_applied', 'tstamp'],
  requiredForInsert: ['version_id', 'is_applied'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as GooseDbVersion,
  $input: null as unknown as GooseDbVersionInput
} as const;

// Table option
export interface Option {
  id: string;
  question_id: string;
  text: string;
  position: number;
}
export interface OptionInput {
  id?: string;
  question_id: string;
  text: string;
  position: number;
}
const option = {
  tableName: 'option',
  columns: ['id', 'question_id', 'text', 'position'],
  requiredForInsert: ['question_id', 'text', 'position'],
  primaryKey: 'id',
  foreignKeys: { question_id: { table: 'question', column: 'id', $type: null as unknown as Question }, },
  $type: null as unknown as Option,
  $input: null as unknown as OptionInput
} as const;

// Table question
export interface Question {
  id: string;
  text: string;
  position: number;
  multiple_responses: boolean;
}
export interface QuestionInput {
  id?: string;
  text: string;
  position: number;
  multiple_responses: boolean;
}
const question = {
  tableName: 'question',
  columns: ['id', 'text', 'position', 'multiple_responses'],
  requiredForInsert: ['text', 'position', 'multiple_responses'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Question,
  $input: null as unknown as QuestionInput
} as const;

// Table response
export interface Response {
  id: string;
  user_id: string;
  question_id: string;
  option_id: string;
}
export interface ResponseInput {
  id?: string;
  user_id: string;
  question_id: string;
  option_id: string;
}
const response = {
  tableName: 'response',
  columns: ['id', 'user_id', 'question_id', 'option_id'],
  requiredForInsert: ['user_id', 'question_id', 'option_id'],
  primaryKey: 'id',
  foreignKeys: {
    user_id: { table: 'user', column: 'id', $type: null as unknown as User },
    question_id: { table: 'question', column: 'id', $type: null as unknown as Question },
    option_id: { table: 'option', column: 'id', $type: null as unknown as Option },
  },
  $type: null as unknown as Response,
  $input: null as unknown as ResponseInput
} as const;

// Table user
export interface User {
  id: string;
  name: string;
}
export interface UserInput {
  id?: string;
  name: string;
}
const user = {
  tableName: 'user',
  columns: ['id', 'name'],
  requiredForInsert: ['name'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as User,
  $input: null as unknown as UserInput
} as const;


export interface TableTypes {
  goose_db_version: {
    select: GooseDbVersion;
    input: GooseDbVersionInput;
  };
  option: {
    select: Option;
    input: OptionInput;
  };
  question: {
    select: Question;
    input: QuestionInput;
  };
  response: {
    select: Response;
    input: ResponseInput;
  };
  user: {
    select: User;
    input: UserInput;
  };
}

export const tables = {
  goose_db_version,
  option,
  question,
  response,
  user,
}
