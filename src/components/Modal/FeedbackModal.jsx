import React from 'react';
import Modal from './Modal';
import './Modal.scss';

const FeedbackModal = ({ isOpen, onClose, onFeedback }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseBtn={true}>
      <div className="feedback-modal">
        <h3>Would you make this recipe again?</h3>
        <div className="feedback-actions">
          <button 
            className="modal-btn btn-success" 
            onClick={() => onFeedback(true)}
          >
            YES!
          </button>
          <button 
            className="modal-btn btn-danger" 
            onClick={() => onFeedback(false)}
          >
            NO!
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default FeedbackModal;
