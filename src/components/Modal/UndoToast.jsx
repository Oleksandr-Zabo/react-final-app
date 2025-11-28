import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const UndoToast = ({ isOpen, onClose, onUndo, message = '12 items deleted', duration = 3000 }) => {
  useEffect(() => {
    if (isOpen && duration) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen, duration, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="undo-toast">
      <span className="undo-message">{message}</span>
      <button className="undo-btn" onClick={onUndo}>Undo</button>
    </div>,
    document.body
  );
};

export default UndoToast;
