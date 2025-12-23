import React from 'react';
import styles from './modal.module.css';

interface EmailModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailModal: React.FC<EmailModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.emailModalOverlay}>
      <div className={styles.emailModalContent}>
        <h2 className={styles.emailModalTitle}>Update Email</h2>
        <p className={styles.emailModalText}>
          To Update Email Contact Us At <strong>humanoverse.verify@gmail.com</strong>
        </p>
        <button onClick={onClose} className={styles.emailModalButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
