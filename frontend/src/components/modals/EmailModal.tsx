import React, { useState } from 'react';
import styles from './modal.module.css';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (password: string, newEmail: string) => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose, onSave }) => {
  const [password, setPassword] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const history = useHistory();

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(password, newEmail);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Update Email</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.modalInput}
          required
        />
        <input
          type="email"
          placeholder="New Email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className={styles.modalInput}
          required
        />
        <div className={styles.buttonGroup}>
          <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleSave} className={styles.modalButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
