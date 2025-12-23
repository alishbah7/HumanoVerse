import { betterAuth, User } from 'better-auth';
import Database from 'better-sqlite3';
import { Resend } from 'resend';

interface SignUpBody {
  email: string;
  password?: string;
}

const db = new Database('./db.sqlite');

/**
 * Resend client
 * Make sure RESEND_API_KEY is set in Railway
 */
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Better Auth configuration
 */
export const auth = betterAuth({
  database: db,

  /**
   * Frontend origins allowed to access auth
   */
  trustedOrigins: [
    'http://localhost:3000',
  ],

  /**
   * Server configuration
   */
  server: {
    origin: [
      'http://localhost:3000',
    ],
    secret: process.env.BETTER_AUTH_SECRET!,
    cookie: {
      secure: true,
      sameSite: 'none',
      path: '/',
    },
  },

  /**
   * Email + password authentication
   */
  emailAndPassword: {
    enabled: true,
    resetPassword: true, // 🔥 REQUIRED

    /**
     * Email verification
     */
    sendVerificationEmail: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      console.log(`📧 Sending verification email to ${user.email}`);

      await resend.emails.send({
        from: 'Humanoverse <onboarding@resend.dev>',
        to: user.email,
        subject: 'Verify your email',
        html: `
          <h2>Email Verification</h2>
          <p>Click the link below to verify your email:</p>
          <a href="${url}">${url}</a>
        `,
      });
    },

    /**
     * Password reset email
     */
    sendResetPassword: async ({
      user,
      url,
    }: {
      user: { email: string };
      url: string;
    }) => {
      console.log(`🔑 Sending reset password email to ${user.email}`);

      await resend.emails.send({
        from: 'Humanoverse <onboarding@resend.dev>',
        to: user.email,
        subject: 'Reset your password',
        html: `
          <h2>Password Reset</h2>
          <p>Click the link below to set a new password:</p>
          <a href="${url}">${url}</a>
        `,
      });
    },
  },

  /**
   * Extend user schema
   */
  user: {
    additionalFields: {
      role: {
        type: 'string',
      },
    },
  },

  /**
   * Assign default role on signup
   */
  onSignUp: async ({ user }: { user: User; body: SignUpBody }) => {
    (user as any).role = 'user';
    return user;
  },

  /**
   * Attach role on sign-in
   */
  onSignIn: async ({ user }: { user: User }) => {
    const row = db
      .prepare('SELECT role FROM user WHERE id = ?')
      .get(user.id) as { role?: string } | undefined;

    (user as any).role = row?.role ?? 'user';
    return user;
  },
});
