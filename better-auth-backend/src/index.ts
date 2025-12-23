import 'dotenv/config';

import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import cors from 'cors';
import { auth } from './auth';
import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';

import type { Request, Response, NextFunction } from 'express';

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const result = await auth.api.getSession({
    headers: req.headers as HeadersInit,
  });

  if (!result) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const dbUser = db
    .prepare('SELECT id, email, role FROM user WHERE id = ?')
    .get(result.user.id);

  (req as any).user = dbUser;
  next();
};






const app = express();
app.use(express.json());
app.set('trust proxy', 1);
app.use('/api/auth', toNodeHandler(auth));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
    ],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);


const db = new Database('./db.sqlite');

import { translate } from 'google-translate-api-x';

app.post('/api/translate', async (req, res) => {
  const { text, targetLang } = req.body;
  
  if (!text || !targetLang) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  
  try {
    const result = await translate(text, { to: targetLang });
    res.json({ translatedText: (result as any).text });
  } catch (error) {
    res.status(500).json({ error: 'Translation failed' });
  }
});

app.get('/api/me', async (req, res) => {
  const result = await auth.api.getSession({
    headers: req.headers as HeadersInit,
  });

  if (!result) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const { user } = result;

  // 🔥 FETCH ROLE FROM DB (source of truth)
  const dbUser = db
    .prepare('SELECT role FROM user WHERE id = ?')
    .get(user.id) as { role?: string } | undefined;

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    role: dbUser?.role ?? 'user',
  });
});

app.get('/api/user', (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  res.json(user);
});

app.patch('/api/user/name', requireAuth, (req, res) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'Name is required' });
  }

  try {
    db.prepare(
      'UPDATE user SET name = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(name, user.id);
    
    res.json({ message: 'Name updated successfully' });
  } catch (error) {
    console.error('Error updating name:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/api/user/password', requireAuth, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  try {
    await auth.api.changePassword({
      headers: req.headers as HeadersInit,
      body: { currentPassword, newPassword },
    });

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Password update failed' });
  }
});

// app.post('/api/user/email', requireAuth, async (req, res) => {
//   const { newEmail } = req.body;

//   if (!newEmail) {
//     return res.status(400).json({
//       message: 'New email is required',
//     });
//   }

//   try {
//     await auth.api.changeEmail({
//       headers: req.headers as HeadersInit,
//       body: {
//         newEmail,
//         callbackURL: 'https://humanoverse.vercel.app/account',
//       },
//     });

//     return res.json({
//       message: 'Verification email sent to new address',
//     });
//   } catch (err: any) {
//     console.error('Change email error:', err);

//     return res.status(400).json({
//       message: err?.message || 'Email update failed',
//     });
//   }
// });

app.get('/api/admin/users', requireAuth, async (req, res) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }

  try {
    const allUsers = db.prepare('SELECT id, name, email, role, createdAt, updatedAt FROM user').all();
    res.json(allUsers);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/api/admin/users', requireAuth, async (req, res) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }

  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = db.prepare(
      'INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)'
    ).run(name, email, hashedPassword, role);

    const newUser = db.prepare('SELECT id, name, email, role, createdAt, updatedAt FROM user WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.delete('/api/admin/users/:id', requireAuth, async (req, res) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }

  const { id } = req.params;

  try {
    const result = db.prepare('DELETE FROM user WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.put('/api/admin/users/:id', requireAuth, async (req, res) => {
  const user = (req as any).user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required.' });
  }

  const { id } = req.params;
  const { name, email, role } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  try {
    const result = db.prepare(
      'UPDATE user SET name = ?, email = ?, role = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ?'
    ).run(name, email, role, id);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const updatedUser = db.prepare('SELECT id, name, email, role, createdAt, updatedAt FROM user WHERE id = ?').get(id);
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// In index.ts
// index.ts
// index.ts

// 1. Forgot Password
app.post('/api/user/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    await auth.api.requestPasswordReset({ 
      body: {
        email,
        redirectTo: 'https://humanoverse.vercel.app/reset-password',
      },
    });
    res.json({ message: 'Reset link sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to request reset' });
  }
});

// 2. Reset Password (CHANGED TO /api/user)
app.post('/api/user/reset-password', async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res.status(400).json({ message: 'Missing token or password' });
  }

  try {
    await auth.api.resetPassword({
      body: {
        token,
        newPassword,
      },
    });
    res.json({ message: 'Password reset successful' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});