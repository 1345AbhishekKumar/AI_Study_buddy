import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { serverEnv } from '@/data/env.server';
import * as schema from './schema';

// Get the database URL from our validated environment
const connectionString = serverEnv.DATABASE_URL;

// Create a single connection pool for the application
const client = postgres(connectionString, {
  // Recommended connection pool settings
  max: 10, // Maximum number of connections in the pool
  idle_timeout: 20, // Close idle connections after 20 seconds
  max_lifetime: 60 * 30, // Close connections after 30 minutes
  // Always use SSL for security
  ssl: 'require',
});

// Create the Drizzle instance with the schema
const db = drizzle(client, {
  schema,
  logger: serverEnv.NODE_ENV === 'development',
});

// Export types for type safety
export type Database = typeof db;

// Re-export schema and db
export * from './schema';
export { db };
