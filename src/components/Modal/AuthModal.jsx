import React, { useState } from 'react';
import Modal from './Modal';
import './Modal.scss';

import mailIcon from '../../assets/img/icons/mail.svg';
import lockIcon from '../../assets/img/icons/lock.svg';
import userIcon from '../../assets/img/icons/user.svg';
import facebookIcon from '../../assets/img/icons/facebook.svg';
// import googleIcon from '../../assets/img/icons/google.svg'; // Not available

const AuthModal = ({ isOpen, onClose, initialView = 'login' }) => {
  const [view, setView] = useState(initialView); // 'login' or 'signup'

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={view === 'login' ? 'LOGIN' : 'SIGN UP'}>
      <form onSubmit={(e) => e.preventDefault()}>
        {view === 'signup' && (
          <div className="modal-form-group">
            <img src={userIcon} alt="" className="input-icon" />
            <input type="text" placeholder="Full Name" required />
          </div>
        )}
        
        <div className="modal-form-group">
          <img src={mailIcon} alt="" className="input-icon" />
          <input type="email" placeholder="Email" required />
        </div>

        <div className="modal-form-group">
          <img src={lockIcon} alt="" className="input-icon" />
          <input type="password" placeholder="Password" required />
        </div>

        {view === 'login' && (
          <div className="forgot-password">
            <a href="#" className="modal-link">Forgot Password?</a>
          </div>
        )}

        <button type="submit" className="modal-btn btn-primary">
          {view === 'login' ? 'Login' : 'Sign up'}
        </button>

        {view === 'signup' && (
          <p className="terms-text">
            By creating an account, you agree to our <a href="#" className="modal-link">Terms & Conditions</a>
          </p>
        )}

        {view === 'login' && (
          <>
            <div className="modal-divider">Or login with</div>
            <div className="social-login">
              <button type="button">
                <img src={facebookIcon} alt="Facebook" />
                Facebook
              </button>
              <button type="button">
                {/* <img src={googleIcon} alt="Google" /> */}
                <span style={{ fontWeight: 'bold', color: '#4285F4' }}>G</span> Google
              </button>
            </div>
            <div className="modal-footer-text">
              Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); toggleView(); }}>Sign up</a>
            </div>
          </>
        )}
        
        {view === 'signup' && (
           <div className="modal-footer-text">
              Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); toggleView(); }}>Login</a>
            </div>
        )}
      </form>
    </Modal>
  );
};

export default AuthModal;
