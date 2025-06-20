import { db } from '@/drizzle/db';
import { users } from '@/drizzle/schema';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Testing database connection...');
    const result = await db.select().from(users).limit(1);
    console.log('Database connection successful. Found users:', result.length);
    return NextResponse.json({
      success: true,
      users: result.length,
      data: result,
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
