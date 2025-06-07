import { pgTable, text, timestamp, uuid, index } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { quizAttempts, quizzes } from './quiz';

// User table
export const users = pgTable(
  'users',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    clerkId: text('clerk_id').notNull().unique(),
    email: text('email').notNull().unique(),
    name: text('name'),
    image: text('image'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
  },
  table => {
    return {
      emailIdx: index('email_idx').on(table.email),
      clerkIdIdx: index('clerk_id_idx').on(table.clerkId),
    };
  }
);

// User relations
export const userRelations = relations(users, ({ many }) => ({
  quizzes: many(quizzes),
  quizAttempts: many(quizAttempts),
}));

// User type export
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
