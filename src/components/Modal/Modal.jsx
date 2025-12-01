import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import closeIcon from '../../assets/img/icons/x.svg';

// Module-level counter for open modals
let openModalCount = 0;

const Modal = ({ isOpen, onClose, children, title, showCloseBtn = true }) => {
  useEffect(() => {
    if (isOpen) {
      openModalCount += 1;
      if (openModalCount === 1) {
        document.body.style.overflow = 'hidden';
      }
    }
    return () => {
      if (isOpen) {
        openModalCount = Math.max(0, openModalCount - 1);
        if (openModalCount === 0) {
          document.body.style.overflow = 'unset';
        }
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {showCloseBtn && (
          <button className="modal-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        )}
        {title && <h3 className="modal-title">{title}</h3>}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
