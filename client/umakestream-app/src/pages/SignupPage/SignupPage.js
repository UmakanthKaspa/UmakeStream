import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        // Signup successful
        console.log("Signup successful");
        success(data.token);
      } else {
        // Signup failed
        console.log("Signup failed:", data.error);
      }
    } catch (error) {
      console.error("An error occurred during signup:", error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1>Unlimited movies, TV</h1>
        <h1>shows and more.</h1>
        <h4>Watch anywhere. Cancel anytime.</h4>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Signup</button>
        </form>
        <h6>
          Ready to watch? Enter your email to create or restart membership.
        </h6>
      </div>
    </div>
  );
};

export default SignupPage;
