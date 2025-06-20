import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, getUserById, updateUser, deleteUser } from '@/lib/users';
import { serverEnv } from '@/data/env.server';
import { sendWelcomeEmail } from '@/lib/email';

export async function POST(req: Request) {
  console.log('Webhook endpoint hit at:', new Date().toISOString());
  const WEBHOOK_SECRET = serverEnv.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    const error = 'CLERK_WEBHOOK_SECRET is not set in environment variables';
    console.error(error);
    return new Response(error, { status: 500 });
  }

  // Get the headers - headers() is synchronous, no await needed
  const headerPayload = headers();
  const svix_id = (await headerPayload).get('svix-id');
  const svix_timestamp = (await headerPayload).get('svix-timestamp');
  const svix_signature = (await headerPayload).get('svix-signature');

  console.log('Received webhook headers:', {
    'svix-id': svix_id ? 'present' : 'missing',
    'svix-timestamp': svix_timestamp ? 'present' : 'missing',
    'svix-signature': svix_signature ? 'present' : 'missing',
  });

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  console.log('Webhook payload received:', {
    type: payload.type,
    data: {
      id: payload.data?.id,
      email: payload.data?.email_addresses?.[0]?.email_address,
      object: payload.data?.object,
    },
  });

  // Create a new Svix instance with your secret
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Error verifying webhook:', {
      error: errorMessage,
      headers: {
        'svix-id': svix_id,
        'svix-timestamp': svix_timestamp,
        'svix-signature': svix_signature ? 'present' : 'missing',
      },
      body: payload,
    });
    return new Response(`Error verifying webhook: ${errorMessage}`, {
      status: 400,
    });
  }

  const eventType = evt.type;

  if (eventType === 'user.created') {
    console.log('Processing user.created event:', JSON.stringify(evt.data, null, 2));

    const { id, email_addresses, first_name, last_name, image_url, username } = evt.data;

    console.log('Extracted user data:', {
      id,
      email: email_addresses?.[0]?.email_address,
      first_name,
      last_name,
      username,
      hasImage: !!image_url,
    });

    if (!id || !email_addresses?.[0]?.email_address) {
      const errorMessage = 'Missing required user data in webhook payload';
      console.error(errorMessage, {
        id,
        hasEmail: !!email_addresses?.[0]?.email_address,
        payload: evt.data,
      });

      return new Response(errorMessage, {
        status: 400,
      });
    }

    try {
      // Use username if first_name and last_name are not available
      const name =
        [first_name, last_name].filter(Boolean).join(' ') || username || email_addresses[0].email_address.split('@')[0];

      const newUser = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: name,
        ...(image_url ? { image: image_url } : {}),
        role: typeof evt.data.public_metadata?.role === 'string' ? evt.data.public_metadata.role : 'student',
        status: typeof evt.data.public_metadata?.status === 'string' ? evt.data.public_metadata.status : 'active',
      };

      console.log('Attempting to create user in database with data:', {
        ...newUser,
        // Don't log the entire user object to avoid sensitive data in logs
        image: newUser.image ? '[image-url-present]' : null,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV,
      });

      const { user, error } = await createUser(newUser);

      if (error) {
        console.error('Failed to create user in database:', {
          error: error.message,
          stack: error.stack,
          userData: {
            ...newUser,
            image: newUser.image ? '[image-url-present]' : null,
          },
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV,
        });

        return new Response(`Error creating user: ${error.message}`, {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.log('Successfully created user in database:', {
        userId: user?.id,
        clerkId: user?.clerkId,
        email: user?.email,
        timestamp: new Date().toISOString(),
      });

      // Send welcome email
      try {
        await sendWelcomeEmail({
          to: email_addresses[0].email_address,
          name: [first_name, last_name].filter(Boolean).join(' '),
        });
      } catch (emailError) {
        console.error('Failed to send welcome email:', emailError);
        // Don't fail the request if email sending fails
      }

      return new Response(JSON.stringify({ user }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  if (eventType === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = evt.data;

    if (!id) {
      return new Response('Error occurred -- missing user ID', {
        status: 400,
      });
    }

    try {
      const { user: existingUser, error: fetchError } = await getUserById({ clerkUserId: id });

      if (fetchError || !existingUser) {
        console.error('User not found:', id);
        return new Response('User not found', { status: 404 });
      }

      const updates: {
        email?: string;
        name?: string;
        image?: string;
      } = {};

      if (email_addresses?.[0]?.email_address) {
        updates.email = email_addresses[0].email_address;
      }
      if (first_name || last_name) {
        updates.name = [first_name, last_name].filter(Boolean).join(' ');
      }
      if (image_url) {
        updates.image = image_url;
      }

      if (Object.keys(updates).length > 0) {
        const { user: updatedUser, error: updateError } = await updateUser(existingUser.id, updates);

        if (updateError) {
          console.error('Failed to update user:', updateError);
          return new Response('Error updating user', { status: 500 });
        }

        return new Response(JSON.stringify({ user: updatedUser }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      return new Response(JSON.stringify({ user: existingUser }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('Unexpected error updating user:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
  }

  if (eventType === 'user.deleted') {
    console.log('Received user.deleted event:', JSON.stringify(evt.data, null, 2));
    const { id } = evt.data;

    if (!id) {
      console.error('Missing user ID in delete event');
      return new Response('Error occurred -- missing user ID', {
        status: 400,
      });
    }

    try {
      const { user: existingUser, error: fetchError } = await getUserById({ clerkUserId: id });

      if (fetchError || !existingUser) {
        console.error('User not found in database, nothing to delete:', id);
        return new Response(JSON.stringify({ success: true, message: 'User not found, nothing to delete' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      console.log('Attempting to delete user from database:', existingUser.id);
      const { success, error: deleteError, user: deletedUser } = await deleteUser(id);

      if (!success || deleteError) {
        console.error('Failed to delete user:', deleteError);
        return new Response(
          JSON.stringify({
            success: false,
            error: deleteError?.message || 'Unknown error deleting user',
          }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }

      console.log('Successfully deleted user:', deletedUser?.id);
      return new Response(
        JSON.stringify({
          success: true,
          deletedUser: {
            id: deletedUser?.id,
            clerkId: deletedUser?.clerkId,
            email: deletedUser?.email,
          },
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    } catch (error) {
      console.error('Unexpected error deleting user:', error);
      return new Response(
        JSON.stringify({
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error occurred',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
  }

  return new Response('', { status: 200 });
}
