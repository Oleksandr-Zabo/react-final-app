import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.scss';
import searchIcon from '../assets/img/icons/search.svg';
import avatar from '../assets/img/avatars/avatar.jpg';
import menuIcon from '../assets/img/icons/menu.svg';
import closeIcon from '../assets/img/icons/x.svg';
import SearchModal from './Search/SearchModal';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);

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
            <NavLink to="/categories" onClick={closeMenu}>All Categories</NavLink>
            <NavLink to="/recipe/strawberry-cream-cheesecake" onClick={closeMenu}>Featured Recipe</NavLink>
          </div>
        </div>

        <div className={`nav-item-dropdown ${expandedMenu === 'pages' ? 'expanded' : ''}`}>
          <span className="nav-link-label" onClick={() => toggleSubmenu('pages')}>
            Pages <span className="arrow">▾</span>
          </span>
          <div className="dropdown-menu">
            <NavLink to="/blog-post" onClick={closeMenu}>Blog Post</NavLink>
            <NavLink to="/about" onClick={closeMenu}>About Us</NavLink>
            <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>
            <NavLink to="/404" onClick={closeMenu}>404 Page</NavLink>
          </div>
        </div>

        <NavLink to="/buy" onClick={closeMenu}>Buy</NavLink>
      </nav>

      <div className="header-actions">
        <button className="search-btn" onClick={toggleSearch}>
          <img src={searchIcon} alt="Search" />
        </button>
        <Link to="/profile" className="user-avatar">
          <img src={avatar} alt="User" />
        </Link>
        <button className="menu-toggle" onClick={toggleMenu}>
          <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu" />
        </button>
      </div>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
};

export default Header;