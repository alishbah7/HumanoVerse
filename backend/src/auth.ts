import { betterAuth, User, Session } from 'better-auth';
import Database from 'better-sqlite3';

interface SignUpBody {
  email: string;
  password?: string;
  // softwareBackground?: string;
  // hardwareBackground?: string;
}

const db = new Database('./db.sqlite');

export const auth = betterAuth({
  database: db,

  trustedOrigins: ['http://localhost:3000', 'humanoverse.vercel.app', 'https://humanoverse.vercel.app'],

  server: {
    origin: ['http://localhost:3000', 'humanoverse.vercel.app', 'https://humanoverse.vercel.app'],
    secret: process.env.BETTER_AUTH_SECRET!,
    cookie: {
      sameSite: 'none',
      secure: true,
    },
  },

  email: {
    from: 'no-reply@example.com',

    sendVerificationEmail: async (
      { email, link }: { email: string; link: string }
    ) => {
      console.log('Verification email to:', email);
      console.log('Verification link:', link);
    },

    sendResetPassword: async (
      { email, link }: { email: string; link: string }
    ) => {
      console.log('Reset password email to:', email);
      console.log('Reset password link:', link);
    },
  },

  user: {
    additionalFields: {
      role: {
        type: 'string',
      },
    },
  },
  
  emailAndPassword: {
    enabled: true,
  },

  /**
   * Assign default role on signup
   */
  onSignUp: async ({ user, body }: { user: User; body: SignUpBody }) => {
    (user as any).role = 'user';

    // (user as any).softwareBackground = body.softwareBackground;
    // (user as any).hardwareBackground = body.hardwareBackground;

    return user;
  },

  // callbacks: {
  //   session: async (
  //     {
  //       session,
  //       user,
  //     }: {
  //       session: Session;
  //       user: User;
  //     }
  //   ) => {
  //     const row = db
  //       .prepare('SELECT role FROM user WHERE id = ?')
  //       .get(user.id) as { role?: string } | undefined;

  //     // ✅ Attach role to USER (not session)
  //     (user as any).role = row?.role ?? 'user';

  //     return { session, user };
  //   },
  // },




  /**
   * Attach role to session on sign-in
   */
  // onSignIn: async ({ user }: { user: User }) => {
  //   const row = db
  //     .prepare('SELECT role FROM user WHERE id = ?')
  //     .get(user.id) as { role?: string } | undefined;

  //   (user as any).role = row?.role ?? 'user';

  //   return user;
  // },
  onSignIn: async ({ user }: { user: User }) => {
    const row = db
      .prepare('SELECT role FROM user WHERE id = ?')
      .get(user.id) as { role?: string } | undefined;

    (user as any).role = row?.role ?? 'user';

    return user;
  },

});
