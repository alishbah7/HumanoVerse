
import Database from 'better-sqlite3';

const db = new Database('./db.sqlite');

function viewUsers() {
  try {
    const rows = db.prepare('SELECT * FROM user').all();
    console.log('Users in the database:');
    console.table(rows);
  } catch (error) {
    console.error('Error viewing users:', error);
  } finally {
    db.close();
  }
}

viewUsers();
