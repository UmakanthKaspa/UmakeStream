import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../assets/auth-background.jpg';
import Navigation from '../../components/Navigation/Navigation'

import './SignupPage.css';

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const jwtToken = Cookies.get('jwt_token');
    if (jwtToken !== undefined) {
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const success = (jwtToken) => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Signup successful
        console.log('Signup successful');
        success(data.token);
      } else {
        // Signup failed
        console.log('Signup failed:', data.error);
      }
    } catch (error) {
      console.error('An error occurred during signup:', error);
    }
  };

  return (
    <div className="signup-container" style={{ backgroundImage: `url(${backgroundImage})` }}>
                  <Navigation />

      <div className="signup-card">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="signup-button">
            Get Started
          </button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
        <p className="terms-of-use">
          This page is for demonstration purposes only. By signing up, you agree to our Terms of
          Use and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
