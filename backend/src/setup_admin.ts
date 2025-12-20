
import { auth } from './auth';
import Database from 'better-sqlite3';

const db = new Database('./db.sqlite');

async function setup() {
  try {
    // Check if 'role' column exists, and add it if not
    const columns: { name: string }[] = db.prepare("PRAGMA table_info(user)").all() as { name: string }[];
    const roleColumnExists = columns.some(
      (column: { name: string }) => column.name === 'role'
    );

    if (!roleColumnExists) {
      db.prepare("ALTER TABLE user ADD COLUMN role TEXT DEFAULT 'user'").run();
      console.log("Added 'role' column to 'user' table.");
    }

    // Delete all existing users
    db.prepare('DELETE FROM user').run();
    console.log('All existing users have been deleted.');

    // Create admin user
    const adminEmail = 'admin@gmail.com';
    const adminPassword = 'admin123';

    await auth.api.signUpEmail({
      body: {
        email: adminEmail,
        password: adminPassword,
        name: 'Admin',
      },
    });

    // Update the user's role to 'admin'
    db.prepare('UPDATE user SET role = ? WHERE email = ?').run(
      'admin',
      adminEmail
    );

    console.log('Admin user created successfully.');
  } catch (error) {
    console.error('Error setting up admin user:', error);
  } finally {
    db.close();
  }
}

setup();
