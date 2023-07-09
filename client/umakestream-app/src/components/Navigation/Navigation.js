import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <header className="navigation">
      <h1 className="navigation-heading">UmakeStream</h1>
      {isLoginPage ? (
        <Link to="/signup" className="navigation-button">
          Signup
        </Link>
      ) : (
        <Link to="/login" className="navigation-button">
          Login
        </Link>
      )}
    </header>
  );
};

export default Navigation;
