import React, { useState } from 'react';
import styles from './modal.module.css';
import { useHistory } from '@docusaurus/router';
import Link from '@docusaurus/Link';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (currentPassword: string, newPassword: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({ isOpen, onClose, onSave }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const history = useHistory();

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(currentPassword, newPassword);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Change Password</h2>
        <input
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className={styles.modalInput}
          required
        />
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className={styles.modalInput}
          required
        />
        <div className={styles.buttonGroup}>
          {/* <Link to="/forgot-password" className={styles.forgotPassword}>Forgot Password?</Link> */}
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleSave} className={styles.modalButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default PasswordModal;
