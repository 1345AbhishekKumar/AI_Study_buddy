import { Resend } from 'resend';
import { WelcomeEmail } from '@/components/emails/welcome-email';
import { serverEnv } from '@/data/env.server';

if (!serverEnv.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

const resend = new Resend(serverEnv.RESEND_API_KEY);
const FROM_EMAIL = 'AI Study Buddy <onboarding@resend.dev>';
const IS_DEVELOPMENT = serverEnv.NODE_ENV === 'development';

type SendEmailParams = {
  to: string;
  name: string;
  verifyLink?: string;
};

export async function sendWelcomeEmail({ to, name, verifyLink }: SendEmailParams) {
  // In development, send to test email address instead of the real one
  const recipientEmail = IS_DEVELOPMENT ? 'delivered@resend.dev' : to;

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: recipientEmail,
      subject: 'Welcome to AI Study Buddy! 🎓',
      react: WelcomeEmail({ name, verifyLink }),
    });

    if (error) {
      console.error('Error sending welcome email:', error);
      throw new Error(`Failed to send welcome email: ${error.message}`);
    }

    console.log('Welcome email sent successfully to:', recipientEmail);
    return { success: true, data };
  } catch (error) {
    console.error('Unexpected error in sendWelcomeEmail:', error);
    // In development, don't fail the entire request if email sending fails
    if (IS_DEVELOPMENT) {
      console.warn('Email sending failed in development, but continuing...');
      return { success: false, error };
    }
    throw error;
  }
}
