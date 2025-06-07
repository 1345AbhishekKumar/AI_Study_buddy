import { Html, Head, Body, Container, Section, Text, Button, Tailwind } from '@react-email/components';

export interface WelcomeEmailProps {
  name: string;
  verifyLink?: string;
}

export function WelcomeEmail({ name, verifyLink }: WelcomeEmailProps) {
  return (
    <Tailwind>
      <Html>
        <Head />
        <Body className="bg-white font-sans">
          <Container className="mx-auto p-6 max-w-2xl">
            <Section className="text-center">
              <Text className="text-2xl font-bold text-indigo-600 mb-4">Welcome to AI Study Buddy! 🎉</Text>
            </Section>

            <Section className="my-6">
              <Text className="text-lg mb-4">Hi {name},</Text>
              <Text className="text-gray-700 mb-4">
                Thank you for signing up for AI Study Buddy! We&apos;re excited to help you achieve your learning goals.
              </Text>

              {verifyLink && (
                <Section className="my-6 text-center">
                  <Text className="mb-4">Please verify your email address to get started:</Text>
                  <Button
                    href={verifyLink}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md text-sm font-medium"
                  >
                    Verify Email
                  </Button>
                  <Text className="text-xs text-gray-500 mt-2">Or copy and paste this link: {verifyLink}</Text>
                </Section>
              )}

              <Text className="text-gray-700 mb-4">Here&apos;s what you can do next:</Text>
              <Section className="pl-5 space-y-1">
                <Text>• Complete your profile</Text>
                <Text>• Set up your first study session</Text>
                <Text>• Connect with study groups</Text>
                <Text>• Explore our learning resources</Text>
              </Section>
            </Section>

            <Section className="mt-8 pt-6 border-t border-gray-200">
              <Text className="text-sm text-gray-500">
                If you didn&apos;t create an account, you can safely ignore this email.
              </Text>
              <Text className="text-xs text-gray-400 mt-2">
                &copy; {new Date().getFullYear()} AI Study Buddy. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
}

WelcomeEmail.displayName = 'WelcomeEmail';
