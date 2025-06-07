import { pgTable, text, timestamp, uuid, integer, boolean, jsonb, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './user';

// Quiz table
export const quizzes = pgTable(
  'quizzes',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    title: text('title').notNull(),
    description: text('description'),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    isPublic: boolean('is_public').default(false).notNull(),
    topic: text('topic'),
    difficulty: text('difficulty', { enum: ['easy', 'medium', 'hard'] }),
    timeLimit: integer('time_limit'), // in minutes
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => ({
    userIdIdx: index('quiz_user_id_idx').on(table.userId),
    topicIdx: index('quiz_topic_idx').on(table.topic),
    difficultyIdx: index('quiz_difficulty_idx').on(table.difficulty),
  })
);

// Question table
export const questions = pgTable(
  'questions',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    quizId: uuid('quiz_id')
      .notNull()
      .references(() => quizzes.id, { onDelete: 'cascade' }),
    questionText: text('question_text').notNull(),
    questionType: text('question_type', { enum: ['multiple_choice', 'true_false', 'short_answer', 'essay'] }).notNull(),
    points: integer('points').default(1).notNull(),
    order: integer('order').notNull(),
    explanation: text('explanation'),
    metadata: jsonb('metadata'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => ({
    quizIdIdx: index('question_quiz_id_idx').on(table.quizId),
  })
);

// Option table (for multiple choice/true-false questions)
export const options = pgTable(
  'options',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    optionText: text('option_text').notNull(),
    isCorrect: boolean('is_correct').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => ({
    questionIdIdx: index('option_question_id_idx').on(table.questionId),
  })
);

// Quiz Attempt table
export const quizAttempts = pgTable(
  'quiz_attempts',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    quizId: uuid('quiz_id')
      .notNull()
      .references(() => quizzes.id, { onDelete: 'cascade' }),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    score: integer('score'),
    maxScore: integer('max_score').notNull(),
    completedAt: timestamp('completed_at', { withTimezone: true }),
    timeSpent: integer('time_spent'), // in seconds
    userAnswers: jsonb('user_answers'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => ({
    quizIdIdx: index('attempt_quiz_id_idx').on(table.quizId),
    userIdIdx: index('attempt_user_id_idx').on(table.userId),
  })
);

// Answer table (for storing individual answers in an attempt)
export const answers = pgTable(
  'answers',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    attemptId: uuid('attempt_id')
      .notNull()
      .references(() => quizAttempts.id, { onDelete: 'cascade' }),
    questionId: uuid('question_id')
      .notNull()
      .references(() => questions.id, { onDelete: 'cascade' }),
    selectedOptionId: uuid('selected_option_id').references(() => options.id, { onDelete: 'set null' }),
    answerText: text('answer_text'),
    isCorrect: boolean('is_correct'),
    pointsAwarded: integer('points_awarded').default(0).notNull(),
    feedback: text('feedback'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => ({
    attemptIdIdx: index('answer_attempt_id_idx').on(table.attemptId),
    questionIdIdx: index('answer_question_id_idx').on(table.questionId),
  })
);

// Relations
export const quizRelations = relations(quizzes, ({ many, one }) => ({
  user: one(users, {
    fields: [quizzes.userId],
    references: [users.id],
  }),
  questions: many(questions),
  attempts: many(quizAttempts),
}));

export const questionRelations = relations(questions, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [questions.quizId],
    references: [quizzes.id],
  }),
  options: many(options),
  answers: many(answers),
}));

export const optionRelations = relations(options, ({ one }) => ({
  question: one(questions, {
    fields: [options.questionId],
    references: [questions.id],
  }),
}));

export const quizAttemptRelations = relations(quizAttempts, ({ one, many }) => ({
  quiz: one(quizzes, {
    fields: [quizAttempts.quizId],
    references: [quizzes.id],
  }),
  user: one(users, {
    fields: [quizAttempts.userId],
    references: [users.id],
  }),
  answers: many(answers),
}));

export const answerRelations = relations(answers, ({ one }) => ({
  attempt: one(quizAttempts, {
    fields: [answers.attemptId],
    references: [quizAttempts.id],
  }),
  question: one(questions, {
    fields: [answers.questionId],
    references: [questions.id],
  }),
  selectedOption: one(options, {
    fields: [answers.selectedOptionId],
    references: [options.id],
  }),
}));

// Type exports
export type Quiz = typeof quizzes.$inferSelect;
export type NewQuiz = typeof quizzes.$inferInsert;

export type Question = typeof questions.$inferSelect;
export type NewQuestion = typeof questions.$inferInsert;

export type Option = typeof options.$inferSelect;
export type NewOption = typeof options.$inferInsert;

export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type NewQuizAttempt = typeof quizAttempts.$inferInsert;

export type Answer = typeof answers.$inferSelect;
export type NewAnswer = typeof answers.$inferInsert;
