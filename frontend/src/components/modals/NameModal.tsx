import React, { useState } from 'react';
import styles from './modal.module.css';

interface NameModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  currentName: string;
}

const NameModal: React.FC<NameModalProps> = ({ isOpen, onClose, onSave, currentName }) => {
  const [name, setName] = useState(currentName);

  if (!isOpen) {
    return null;
  }

  const handleSave = () => {
    onSave(name);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h2>Edit Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.modalInput}
        />
        <div className={styles.buttonGroup}>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
          <button onClick={handleSave} className={styles.modalButton}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default NameModal;
