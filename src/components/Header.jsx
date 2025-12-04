import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import searchIcon from '../assets/img/icons/search.svg';
import userIcon from '../assets/img/icons/user.svg';
import menuIcon from '../assets/img/icons/menu.svg';
import closeIcon from '../assets/img/icons/x.svg';
import facebook from '../assets/img/icons/facebook.svg';
import twitter from '../assets/img/icons/twitter.svg';
import instagram from '../assets/img/icons/instagram.svg';
import SearchModal from './Search/SearchModal';
import { AuthModal } from './Modal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [avatar, setAvatar] = useState(userIcon);
  const location = useLocation();

  useEffect(() => {
    const loadProfile = () => {
      const savedProfile = localStorage.getItem('userProfile');
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        if (parsed.avatar) {
          setAvatar(parsed.avatar);
        }
      } else {
        setAvatar(userIcon);
      }
    };

    loadProfile();
    window.addEventListener('userProfileUpdate', loadProfile);
    return () => window.removeEventListener('userProfileUpdate', loadProfile);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setExpandedMenu(null);
  };

  const toggleSubmenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const handleUserClick = (e) => {
    const savedProfile = localStorage.getItem('userProfile');
    if (!savedProfile) {
      e.preventDefault();
      setIsAuthModalOpen(true);
    }
  };

  const openLogin = () => {
    closeMenu();
    setIsAuthModalOpen(true);
  };

  return (
    <header className="site-header">
      <Link to="/" className="logo" onClick={closeMenu}>Tastebite</Link>
      
      <nav className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
        <div className={`nav-item-dropdown ${expandedMenu === 'homepage' ? 'expanded' : ''}`}>
          <span className="nav-link-label" onClick={() => toggleSubmenu('homepage')}>
            Homepage <span className="arrow">▾</span>
          </span>
          <div className="dropdown-menu">
            <NavLink to="/" end onClick={closeMenu}>Homepage 1</NavLink>
            <NavLink to="/homepage-2" onClick={closeMenu}>Homepage 2</NavLink>
            <NavLink to="/homepage-3" onClick={closeMenu}>Homepage 3</NavLink>
          </div>
        </div>
        
        <div className={`nav-item-dropdown ${expandedMenu === 'recipes' ? 'expanded' : ''}`}>
          <span className="nav-link-label" onClick={() => toggleSubmenu('recipes')}>
            Recipe Page <span className="arrow">▾</span>
          </span>
          <div className="dropdown-menu">
            <NavLink to="/categories" onClick={closeMenu}>Categories</NavLink>
            <NavLink to="/favorites" onClick={closeMenu}>Favorites</NavLink>
          </div>
        </div>

        <NavLink to="/blog-post" onClick={closeMenu}>Blog Page</NavLink>
        <NavLink to="/about" onClick={closeMenu}>About</NavLink>
        <NavLink to="/profile" onClick={closeMenu}>Profile</NavLink>

        <div className="mobile-menu-footer">
          <button className="login-btn" onClick={openLogin}>Login</button>
          <div className="social-icons">
            <a href="#"><img src={facebook} alt="Facebook" /></a>
            <a href="#"><img src={twitter} alt="Twitter" /></a>
            <a href="#"><img src={instagram} alt="Instagram" /></a>
          </div>
        </div>
      </nav>

      <div className="header-actions">
        <button className="search-btn" onClick={toggleSearch}>
          <img src={searchIcon} alt="Search" />
        </button>
        <Link to="/profile" className="user-avatar" onClick={handleUserClick}>
          <img src={avatar} alt="User" />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
        </button>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </header>
  );
};

export default Header;