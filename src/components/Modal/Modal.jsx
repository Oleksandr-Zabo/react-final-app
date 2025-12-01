import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';
import closeIcon from '../../assets/img/icons/x.svg';

// Module-level counter for open modals
let openModalCount = 0;

const FOCUSABLE_ELEMENTS_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  'audio[controls]',
  'video[controls]',
  '[tabindex]:not([tabindex="-1"])'
].join(', ');

const Modal = ({ isOpen, onClose, children, title, showCloseBtn = true }) => {
  const modalRef = useRef(null);
  const previousActiveElement = useRef(null);

  // Handle Escape key press
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }

    // Focus trap: handle Tab key
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
      
      // Exit early if no focusable elements
      if (focusableElements.length === 0) {
        e.preventDefault();
        return;
      }
      
      const firstFocusable = focusableElements[0];
      const lastFocusable = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: if focus is on first element, move to last
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable?.focus();
        }
      } else {
        // Tab: if focus is on last element, move to first
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable?.focus();
        }
      }
    }
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      openModalCount += 1;
      if (openModalCount === 1) {
        document.body.style.overflow = 'hidden';
      }

      // Store currently focused element to restore later
      previousActiveElement.current = document.activeElement;
    }
    return () => {
      if (isOpen) {
        openModalCount = Math.max(0, openModalCount - 1);
        if (openModalCount === 0) {
          document.body.style.overflow = 'unset';
        }
        // Restore focus to the previously focused element
        previousActiveElement.current?.focus();
      }
    };
  }, [isOpen]);

  // Use useLayoutEffect for focus management to ensure DOM is ready
  useLayoutEffect(() => {
    if (isOpen && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(FOCUSABLE_ELEMENTS_SELECTOR);
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      } else {
        // If no focusable elements, focus the modal container itself
        modalRef.current.focus();
      }
    }
  }, [isOpen]);

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
        onKeyDown={handleKeyDown}
      >
        {showCloseBtn && (
          <button className="modal-close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        )}
        {title && <h3 id="modal-title" className="modal-title">{title}</h3>}
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
