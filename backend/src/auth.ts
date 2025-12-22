import { betterAuth, User, Session } from 'better-auth';
import Database from 'better-sqlite3';
import nodemailer from 'nodemailer';

interface SignUpBody {
  email: string;
  password?: string;
  // softwareBackground?: string;
  // hardwareBackground?: string;
}

const db = new Database('./db.sqlite');

export const auth = betterAuth({
  database: db,

  trustedOrigins: ['http://localhost:3000', 'https://humanoverse.vercel.app', 'humanoverse.vercel.app'],

  server: {
    origin: ['http://localhost:3000', 'https://humanoverse.vercel.app', 'humanoverse.vercel.app'],
    secret: process.env.BETTER_AUTH_SECRET!,
    cookie: {
      sameSite: 'none',
      secure: true,
      path: '/'
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
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Password Reset',
        text: `Click here to reset your password: ${link}`,
      };

      await transporter.sendMail(mailOptions);
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
    passwordReset: true,
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

  onSignIn: async ({ user }: { user: User }) => {
    const row = db
      .prepare('SELECT role FROM user WHERE id = ?')
      .get(user.id) as { role?: string } | undefined;

    (user as any).role = row?.role ?? 'user';

    return user;
  },

});
