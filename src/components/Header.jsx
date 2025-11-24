import React from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';
import searchIcon from '../assets/img/icons/search.svg';
import avatar from '../assets/img/avatars/avatar.jpg';

const Header = () => {
  return (
    <header className="site-header">
      <Link to="/" className="logo">Tastebite</Link>
      
      <nav className="nav-links">
        <Link to="/">Homepage ▾</Link>
        <Link to="/">Recipe Page ▾</Link>
        <Link to="/">Pages ▾</Link>
        <Link to="/">Buy</Link>
      </nav>

      <div className="header-actions">
        <button className="search-btn">
          <img src={searchIcon} alt="Search" />
        </button>
        <div className="user-avatar">
          <img src={avatar} alt="User" />
        </div>
      </div>
    </header>
  );
};

export default Header;