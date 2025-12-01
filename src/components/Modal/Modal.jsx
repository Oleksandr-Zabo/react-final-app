import React, { useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import closeIcon from '../../assets/img/icons/x.svg';

// Module-level counter for open modals
let openModalCount = 0;

const FOCUSABLE_ELEMENTS_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const Modal = ({ isOpen, onClose, children, title, showCloseBtn = true }) => {
  const modalRef = useRef(null);
  const previouslyFocusedElement = useRef(null);

  // Handle ESC key press
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      // Focus trap: handle Tab key
      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          FOCUSABLE_ELEMENTS_SELECTOR
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          // Shift + Tab: if on first element, wrap to last
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement?.focus();
          }
        } else {
          // Tab: if on last element, wrap to first
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement?.focus();
          }
        }
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      openModalCount += 1;
      if (openModalCount === 1) {
        document.body.style.overflow = 'hidden';
      }

      // Store the currently focused element to restore later
      previouslyFocusedElement.current = document.activeElement;

      // Focus the first focusable element in the modal
      const focusFirstElement = () => {
        if (modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            FOCUSABLE_ELEMENTS_SELECTOR
          );
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          } else {
            // If no focusable elements, focus the modal container itself
            modalRef.current.focus();
          }
        }
      };

      // Use requestAnimationFrame to ensure the modal is rendered before focusing
      requestAnimationFrame(focusFirstElement);

      // Add keydown event listener
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (isOpen) {
        openModalCount = Math.max(0, openModalCount - 1);
        if (openModalCount === 0) {
          document.body.style.overflow = 'unset';
        }

        // Remove keydown event listener
        document.removeEventListener('keydown', handleKeyDown);

        // Restore focus to the previously focused element
        if (previouslyFocusedElement.current) {
          previouslyFocusedElement.current.focus();
        }
      }
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={`modal-overlay ${isOpen ? 'is-open' : ''}`} onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-container"
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
      >
        {showCloseBtn && (
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <img src={closeIcon} alt="" />
          </button>
        )}
        {title && (
          <h3 id="modal-title" className="modal-title">
            {title}
          </h3>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
