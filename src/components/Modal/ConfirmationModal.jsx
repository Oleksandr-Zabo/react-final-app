import React from 'react';
import Modal from './Modal';
import './Modal.scss';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Delete', cancelText = 'Cancel', isDanger = false }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} showCloseBtn={false}>
      <div className="delete-modal">
        <p>{message}</p>
        <div className="delete-actions">
          <button 
            className={`modal-btn ${isDanger ? 'btn-danger' : 'btn-primary'}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button className="modal-btn btn-white" onClick={onClose}>
            {cancelText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
