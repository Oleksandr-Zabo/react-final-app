import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Profile.scss';
import defaultAvatar from '../../assets/img/avatars/avatar.jpg';
import userIcon from '../../assets/img/icons/user.svg';
import atSignIcon from '../../assets/img/icons/at-sign.svg';
import mailIcon from '../../assets/img/icons/mail.svg';
import lockIcon from '../../assets/img/icons/lock.svg';
import logOutIcon from '../../assets/img/icons/log-out.svg';
import facebookIcon from '../../assets/img/icons/facebook.svg';
import googleIcon from '../../assets/img/icons/chrome.svg';

const Profile = () => {
  const fileInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  
  const [profile, setProfile] = useState({
    fullName: 'Suzan Miller',
    username: 'Miller',
    email: 'suzan@gmail.com',
    password: 'password123',
    avatar: defaultAvatar,
    newsletter: true,
    connectedAccounts: {
      facebook: true,
      google: true
    }
  });

  useEffect(() => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const parsed = JSON.parse(savedProfile);
      setProfile(prev => ({ ...prev, ...parsed }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    alert('Profile saved successfully!');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem('userProfile');
        alert('Account deleted (simulated)');
        setProfile({
            fullName: '',
            username: '',
            email: '',
            password: '',
            avatar: defaultAvatar,
            newsletter: false,
            connectedAccounts: { facebook: false, google: false }
        });
    }
  };

  // Avatar Logic
  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAvatar = () => {
    setProfile(prev => ({ ...prev, avatar: defaultAvatar }));
  };

  // Connected Accounts Logic
  const toggleAccount = (provider) => {
    setProfile(prev => ({
      ...prev,
      connectedAccounts: {
        ...prev.connectedAccounts,
        [provider]: !prev.connectedAccounts[provider]
      }
    }));
  };

  // Newsletter Logic
  const toggleNewsletter = () => {
    setProfile(prev => ({ ...prev, newsletter: !prev.newsletter }));
  };

  // Password Logic (Focus)
  const handlePasswordFocus = () => {
    if (passwordInputRef.current) {
      passwordInputRef.current.focus();
      passwordInputRef.current.type = "text";
      setTimeout(() => {
          if(passwordInputRef.current) passwordInputRef.current.type = "password";
      }, 1000);
    }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="profile-header">
          <h1 className="page-title">Profile</h1>
          <button className="save-btn" onClick={handleSave}>SAVE</button>
        </div>

        <div className="profile-content">
          <div className="avatar-section">
            <div className="avatar-wrapper">
              <img src={profile.avatar} alt="Profile" />
            </div>
            <div className="avatar-actions">
              <input 
                type="file" 
                ref={fileInputRef} 
                style={{ display: 'none' }} 
                accept="image/*"
                onChange={handleFileChange}
              />
              <button className="change-photo-btn" onClick={handleAvatarClick}>Change photo</button>
              <button className="delete-photo-btn" onClick={handleDeleteAvatar}>Delete</button>
            </div>
          </div>

          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <label>FULL NAME</label>
                <div className="input-wrapper">
                  <img src={userIcon} alt="" className="input-icon" />
                  <input 
                    type="text" 
                    name="fullName" 
                    value={profile.fullName} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>USERNAME</label>
                <div className="input-wrapper">
                  <img src={atSignIcon} alt="" className="input-icon" />
                  <input 
                    type="text" 
                    name="username" 
                    value={profile.username} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>EMAIL</label>
                <div className="input-wrapper">
                  <img src={mailIcon} alt="" className="input-icon" />
                  <input 
                    type="email" 
                    name="email" 
                    value={profile.email} 
                    onChange={handleChange} 
                  />
                </div>
              </div>
              <div className="form-group">
                <label>PASSWORD</label>
                <div className="input-wrapper">
                  <img src={lockIcon} alt="" className="input-icon" />
                  <input 
                    ref={passwordInputRef}
                    type="password" 
                    name="password" 
                    value={profile.password} 
                    onChange={handleChange} 
                  />
                  <button className="change-link" onClick={handlePasswordFocus}>Change</button>
                </div>
              </div>
            </div>
          </div>

          <div className="connected-accounts">
            <h3>Connected Accounts</h3>
            
            <div className="account-item">
              <div className="account-info">
                <img src={facebookIcon} alt="Facebook" className="account-icon" />
                <div className="account-details">
                  <span className="account-name">Facebook</span>
                  <span className="account-sub">
                    {profile.connectedAccounts.facebook ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              </div>
              <button 
                className={`disconnect-btn ${!profile.connectedAccounts.facebook ? 'connect' : ''}`}
                onClick={() => toggleAccount('facebook')}
              >
                {profile.connectedAccounts.facebook ? 'Disconnect' : 'Connect'}
              </button>
            </div>

            <div className="account-item">
              <div className="account-info">
                <img src={googleIcon} alt="Google" className="account-icon" />
                <div className="account-details">
                  <span className="account-name">Google</span>
                  <span className="account-sub">
                    {profile.connectedAccounts.google ? 'Connected' : 'Not connected'}
                  </span>
                </div>
              </div>
              <button 
                className={`disconnect-btn ${!profile.connectedAccounts.google ? 'connect' : ''}`}
                onClick={() => toggleAccount('google')}
              >
                {profile.connectedAccounts.google ? 'Disconnect' : 'Connect'}
              </button>
            </div>
          </div>

          <div className="newsletter-section">
            <h3>Newsletter</h3>
            <div className="newsletter-content">
              <p>
                {profile.newsletter 
                  ? 'You are currently subscribed to our newsletter' 
                  : 'You are not subscribed to our newsletter'}
              </p>
              <button 
                className="unsubscribe-btn"
                onClick={toggleNewsletter}
              >
                {profile.newsletter ? 'Unsubscribe' : 'Subscribe'}
              </button>
            </div>
          </div>

          <div className="profile-footer">
            <Link to="/" className="sign-out-link">
              <img src={logOutIcon} alt="" />
              Sign out
            </Link>
            <button className="delete-account-btn" onClick={handleDeleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
