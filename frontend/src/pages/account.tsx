import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import { useSession, updateName, updateEmail, updatePassword } from '../lib/auth-client';
import { useHistory } from '@docusaurus/router';
import '../css/auth.css';
import styles from './account.module.css';
import NameModal from '../components/modals/NameModal';
import EmailModal from '../components/modals/EmailModal';
import PasswordModal from '../components/modals/PasswordModal';

function Account() {
  const { data: session, isPending, refetch } = useSession();
  const history = useHistory();
  const [user, setUser] = useState(session?.user || null);
  const [isNameModalOpen, setIsNameModalOpen] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!isPending && !session) {
      history.push('/login');
    }
    if (session?.user) {
      setUser(session.user);
    }
  }, [session, isPending, history]);

  const handleNameSave = async (name: string) => {
    setError(null);
    setSuccess(null);
    try {
      await updateName(name);
      refetch(); // Re-fetch session data
      setSuccess('Name updated successfully!');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsNameModalOpen(false);
    }
  };

  const handleEmailSave = async (password: string, newEmail: string) => {
    setError(null);
    setSuccess(null);
    try {
      await updateEmail(password, newEmail);
      refetch(); // Re-fetch session data
      setSuccess('Email updated successfully!');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsEmailModalOpen(false);
    }
  };

  const handlePasswordSave = async (currentPassword: string, newPassword: string) => {
    setError(null);
    setSuccess(null);
    try {
      await updatePassword(currentPassword, newPassword);
      setSuccess('Password updated successfully!');
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsPasswordModalOpen(false);
    }
  };

  if (isPending || !user) {
    return <Layout title="Account" description="User account page"><div className="auth-container"><h1>Loading...</h1></div></Layout>;
  }

  return (
    <Layout title="Account" description="User account page">
      <div className="auth-container">
        <div className={styles.accountInfo}>
          <h1 className={styles.accountHeading}>Your Account</h1>
          {error && <div className="alert alert--danger">{error}</div>}
          {success && <div className="alert alert--success">{success}</div>}
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Name</div>
            <div className={styles.valueButtonRow}>
              <div className={styles.infoValue}>{user.name}</div>
              <button onClick={() => setIsNameModalOpen(true)} className={styles.editButton}>Edit</button>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Email</div>
            <div className={styles.valueButtonRow}>
              <div className={styles.infoValue}>{user.email}</div>
              <button onClick={() => setIsEmailModalOpen(true)} className={styles.editButton}>Update</button>
            </div>
          </div>
          <div className={styles.infoRow}>
            <div className={styles.infoLabel}>Password</div>
            <div className={styles.valueButtonRow}>
              <div className={styles.infoValue}>********</div>
              <button onClick={() => setIsPasswordModalOpen(true)} className={styles.editButton}>Change Password</button>
            </div>
          </div>
        </div>
      </div>
      <NameModal
        isOpen={isNameModalOpen}
        onClose={() => setIsNameModalOpen(false)}
        onSave={handleNameSave}
        currentName={user.name}
      />
      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        // onSave={handleEmailSave}
      />
      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onSave={handlePasswordSave}
      />
    </Layout>
  );
}

export default Account;
