import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

import { FaSearch, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import './Header.css';

const Header = () => {
  const [isFixed, setIsFixed] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchBlur = () => {
    setIsSearchOpen(false);
  };

  const handleSearchHover = () => {
    setIsSearchOpen(true);
  };

  const handleSearchLeave = () => {
    setIsSearchOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsFixed(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("jwt_token")
    navigate('/login')  };

  return (
    <header className={`header ${isFixed ? 'fixed' : ''}`}>
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
UmakeStream          </Link>
          <ul className="nav-links">
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li>
              <Link to="/favorites">Favorites</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-right">
          <div
            className={`search ${isSearchOpen ? 'open' : ''}`}
            onMouseEnter={handleSearchHover}
            onMouseLeave={handleSearchLeave}
          >
            <input type="text" placeholder="Search" onBlur={handleSearchBlur} />
            <FaSearch className="search-icon" onClick={handleSearchClick} />
          </div>
          <div className="profile-section">
            <Link to="/profile">
              <FaUserCircle className="profile-icon" />
            </Link>
            <button type="button" className='logout-icon-button' onClick={handleLogout}>
              <FaSignOutAlt className="logout-icon" />
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
