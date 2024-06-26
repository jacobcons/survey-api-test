/* tslint:disable */
/* eslint-disable */


/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was automatically generated by pg-to-ts v.4.1.1
 * $ pg-to-ts generate -c postgresql://username:password@localhost:5432/survey-test -C -t goose_db_version -t option -t question -t response -t user -s public
 *
 */


export type Json = unknown;

// Table goose_db_version
export interface GooseDbVersion {
  id: number;
  versionId: number;
  isApplied: boolean;
  tstamp: Date | null;
}
export interface GooseDbVersionInput {
  id?: number;
  versionId: number;
  isApplied: boolean;
  tstamp?: Date | null;
}
const goose_db_version = {
  tableName: 'goose_db_version',
  columns: ['id', 'versionId', 'isApplied', 'tstamp'],
  requiredForInsert: ['versionId', 'isApplied'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as GooseDbVersion,
  $input: null as unknown as GooseDbVersionInput
} as const;

// Table option
export interface Option {
  id: string;
  questionId: string;
  text: string;
  position: number;
}
export interface OptionInput {
  id?: string;
  questionId: string;
  text: string;
  position: number;
}
const option = {
  tableName: 'option',
  columns: ['id', 'questionId', 'text', 'position'],
  requiredForInsert: ['questionId', 'text', 'position'],
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
  multipleResponses: boolean;
}
export interface QuestionInput {
  id?: string;
  text: string;
  position: number;
  multipleResponses: boolean;
}
const question = {
  tableName: 'question',
  columns: ['id', 'text', 'position', 'multipleResponses'],
  requiredForInsert: ['text', 'position', 'multipleResponses'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Question,
  $input: null as unknown as QuestionInput
} as const;

// Table response
export interface Response {
  id: string;
  userId: string;
  questionId: string;
  optionId: string;
}
export interface ResponseInput {
  id?: string;
  userId: string;
  questionId: string;
  optionId: string;
}
const response = {
  tableName: 'response',
  columns: ['id', 'userId', 'questionId', 'optionId'],
  requiredForInsert: ['userId', 'questionId', 'optionId'],
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
