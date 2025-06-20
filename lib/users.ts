import { db } from '@/drizzle/db';
import { users, type User, type NewUser } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function createUser(data: NewUser) {
  try {
    console.log('Creating user in database with data:', {
      clerkId: data.clerkId,
      email: data.email,
      name: data.name,
    });

    // Test database connection first
    try {
      await db.select().from(users).limit(1);
      console.log('Database connection test successful');
    } catch (dbError) {
      console.error('Database connection test failed:', {
        error: dbError instanceof Error ? dbError.message : 'Unknown error',
        stack: dbError instanceof Error ? dbError.stack : undefined,
        databaseUrl: process.env.DATABASE_URL ? 'DATABASE_URL is set' : 'DATABASE_URL is not set',
      });
      throw new Error('Database connection failed');
    }

    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.clerkId, data.clerkId)).limit(1);

    if (existingUser.length > 0) {
      console.log('User already exists with clerkId:', data.clerkId);
      return { user: existingUser[0], error: null };
    }

    console.log('Attempting to insert user into database with data:', {
      ...data,
      // Don't log sensitive data
      image: data.image ? '[image-url-present]' : null,
    });

    const [user] = await db.insert(users).values(data).returning();

    console.log('Successfully created user in database:', {
      id: user.id,
      email: user.email,
      name: user.name, // This will show if name was saved
      clerkId: user.clerkId,
      timestamp: new Date().toISOString(),
    });

    return { user, error: null };
  } catch (error) {
    console.error('Error in createUser function:', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      data: {
        clerkId: data.clerkId,
        email: data.email,
        name: data.name,
      },
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      databaseUrl: process.env.DATABASE_URL ? 'Set' : 'Not set',
    });

    return {
      user: null,
      error: error instanceof Error ? error : new Error('Failed to create user'),
    };
  }
}

export async function getUserById({ id, clerkUserId }: { id?: string; clerkUserId?: string }) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('id or clerkUserId is required');
    }

    let whereClause;
    if (id) {
      whereClause = eq(users.id, id);
    } else if (clerkUserId) {
      whereClause = eq(users.clerkId, clerkUserId);
    } else {
      throw new Error('Either id or clerkUserId must be provided');
    }

    const [user] = await db.select().from(users).where(whereClause).limit(1);

    return { user: user || null, error: null };
  } catch (error) {
    console.error('Error getting user:', error);
    return {
      user: null,
      error: error instanceof Error ? error : new Error('Failed to get user'),
    };
  }
}

export async function updateUser(id: string, data: Partial<User>) {
  try {
    const [user] = await db
      .update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, id))
      .returning();

    if (!user) {
      throw new Error(`No user found with id: ${id}`);
    }

    return { user, error: null };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      user: null,
      error: error instanceof Error ? error : new Error('Failed to update user'),
    };
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    return { user: user || null, error: null };
  } catch (error) {
    console.error('Error getting user by email:', error);
    return {
      user: null,
      error: error instanceof Error ? error : new Error('Failed to get user by email'),
    };
  }
}

export async function deleteUser(clerkId: string) {
  try {
    if (!clerkId) {
      const error = new Error('clerkId is required for user deletion');
      console.error('Validation error in deleteUser:', error.message);
      return { success: false, error, user: null };
    }

    console.log(`Attempting to delete user with clerkId: ${clerkId}`);

    const [deletedUser] = await db.delete(users).where(eq(users.clerkId, clerkId)).returning();

    if (!deletedUser) {
      const error = new Error(`No user found with clerkId: ${clerkId}`);
      console.error('Delete operation returned no rows:', error.message);
      return { success: false, error, user: null };
    }

    console.log(`Successfully deleted user with id: ${deletedUser.id}`);
    return {
      success: true,
      error: null,
      user: deletedUser,
      message: 'User deleted successfully',
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during user deletion';
    console.error('Error in deleteUser:', errorMessage, error);
    return {
      success: false,
      error: error instanceof Error ? error : new Error(errorMessage),
      user: null,
    };
  }
}

// Additional helper function for batch operations
export async function getAllUsers() {
  try {
    const allUsers = await db.select().from(users);
    return { users: allUsers, error: null };
  } catch (error) {
    console.error('Error getting all users:', error);
    return {
      users: null,
      error: error instanceof Error ? error : new Error('Failed to get all users'),
    };
  }
}
