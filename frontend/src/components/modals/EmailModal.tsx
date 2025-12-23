import React, { useState } from 'react';
import styles from './modal.module.css';
import Link from '@docusaurus/Link';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (password: string, newEmail: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSave }) => {
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    setError(null);

    if (!password.trim()) {
      setError('Current password is required.');
      return;
    }

    if (!newEmail.trim()) {
      setError('New email is required.');
      return;
    }

    onSave(password, newEmail);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Update Email</h2>

        {error && <div className="alert alert--danger">{error}</div>}

        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.modalInput}
        />

        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className={styles.modalInput}
        />

        <div className={styles.buttonGroup}>
          <Link to="/forgot-password" className={styles.forgotPassword}>
            Forgot Password?
          </Link>
          <button onClick={onClose} className={styles.cancelButton}>
            Cancel
          </button>
          <button onClick={handleSave} className={styles.modalButton}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
