import React from 'react';
import styles from './Modal.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            
            {children}
          </div>
        </div>
      )}
      {isOpen && <div className={styles.overlay}></div>}
    </>
  );
};

export default Modal;