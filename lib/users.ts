import { db } from '@/drizzle/db';
import { users, type User, type NewUser } from '@/drizzle/schema';
import { eq } from 'drizzle-orm';

export async function createUser(data: NewUser) {
  try {
    const [user] = await db.insert(users).values(data).returning();
    return { user };
  } catch (error) {
    console.error('Error creating user:', error);
    return { error: error instanceof Error ? error : new Error('Failed to create user') };
  }
}

export async function getUserById({ id, clerkUserId }: { id?: string; clerkUserId?: string }) {
  try {
    if (!id && !clerkUserId) {
      throw new Error('id or clerkUserId is required');
    }

    const [user] = await db
      .select()
      .from(users)
      .where(id ? eq(users.id, id) : clerkUserId ? eq(users.clerkId, clerkUserId) : undefined)
      .limit(1);

    return { user: user || null };
  } catch (error) {
    console.error('Error getting user:', error);
    return {
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

    return { user };
  } catch (error) {
    console.error('Error updating user:', error);
    return {
      error: error instanceof Error ? error : new Error('Failed to update user'),
    };
  }
}

// Additional helper function to get user by email
export async function getUserByEmail(email: string) {
  try {
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    return { user: user || null };
  } catch (error) {
    console.error('Error getting user by email:', error);
    return {
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
