import { sendWelcomeEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const { to, name, verifyLink } = body;

  try {
    const result = await sendWelcomeEmail({ to, name, verifyLink });
    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}
