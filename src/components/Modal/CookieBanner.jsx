import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.scss';

const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if cookie consent is already given
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div className="cookie-banner">
      <div className="cookie-content">
        <h3>Cookie Notice</h3>
        <p>
          To ensure an optimum user experience, we use cookies to collect some user data for advertising and analytics purposes.
        </p>
      </div>
      <button className="modal-btn btn-primary" onClick={handleAccept}>
        Got it
      </button>
    </div>,
    document.body
  );
};

export default CookieBanner;
