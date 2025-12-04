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
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const toggleView = () => {
    setView(view === 'login' ? 'signup' : 'login');
    setFormData({ fullName: '', email: '', password: '' });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate authentication
    const userProfile = {
      fullName: formData.fullName || 'User',
      username: formData.fullName || 'User',
      email: formData.email,
      avatar: null // Use default
    };

    if (view === 'login') {
        // For demo, just log them in with the email part as name if not provided
        if (!userProfile.fullName) {
            userProfile.fullName = formData.email.split('@')[0];
            userProfile.username = userProfile.fullName;
        }
    }

    localStorage.setItem('userProfile', JSON.stringify(userProfile));
    
    // Dispatch event to notify other components
    window.dispatchEvent(new Event('userProfileUpdate'));
    
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={view === 'login' ? 'LOGIN' : 'SIGN UP'}>
      <form onSubmit={handleSubmit}>
        {view === 'signup' && (
          <div className="modal-form-group">
            <img src={userIcon} alt="" className="input-icon" />
            <input 
                type="text" 
                name="fullName"
                placeholder="Full Name" 
                value={formData.fullName}
                onChange={handleInputChange}
                required 
            />
          </div>
        )}
        
        <div className="modal-form-group">
          <img src={mailIcon} alt="" className="input-icon" />
          <input 
            type="email" 
            name="email"
            placeholder="Email" 
            value={formData.email}
            onChange={handleInputChange}
            required 
          />
        </div>

        <div className="modal-form-group">
          <img src={lockIcon} alt="" className="input-icon" />
          <input 
            type="password" 
            name="password"
            placeholder="Password" 
            value={formData.password}
            onChange={handleInputChange}
            required 
          />
        </div>

        {view === 'login' && (
          <div className="forgot-password">
            <a href="/" className="modal-link" onClick={(e) => e.preventDefault()}>Forgot Password?</a>
          </div>
        )}

        <button type="submit" className="modal-btn btn-primary">
          {view === 'login' ? 'Login' : 'Sign up'}
        </button>

        {view === 'signup' && (
          <p className="terms-text">
            By creating an account, you agree to our <a href="/" className="modal-link" onClick={(e) => e.preventDefault()}>Terms & Conditions</a>
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
              Don't have an account? <a href="/" onClick={(e) => { e.preventDefault(); toggleView(); }}>Sign up</a>
            </div>
          </>
        )}
        
        {view === 'signup' && (
           <div className="modal-footer-text">
              Already have an account? <a href="/" onClick={(e) => { e.preventDefault(); toggleView(); }}>Login</a>
            </div>
        )}
      </form>
    </Modal>
  );
};

export default AuthModal;
