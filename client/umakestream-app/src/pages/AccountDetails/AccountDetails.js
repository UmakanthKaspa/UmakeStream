import React, {useEffect} from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

import './AccountDetails.css';

const AccountDetails = () => {
    const navigate = useNavigate()
const    logout = ()=>{
        Cookies.remove("jwt_token")
        navigate('/login')
    }
    useEffect(()=>{
        if ( ! Cookies.get('jwt_token')){
            navigate('/login')
        }
    })

  return (
    <div className="account-details-container">
      <h2>Account Details</h2>
      <div className="profile-section">
        <div className="profile-picture">
          <img src="https://dummyimage.com/150x150/000000/ffffff" alt="Profile" />
        </div>
        <div className="profile-info">
          <h3>John Doe</h3>
          <p>Email: johndoe@example.com</p>
          <p>Member Since: January 1, 2023</p>
        </div>
      </div>
      <div className="subscription-section">
        <h3>Subscription Details</h3>
        <p>Plan: Premium</p>
        <p>Billing Cycle: Monthly</p>
        <p>Next Billing Date: July 15, 2023</p>
      </div>
      <div className="payment-section">
        <h3>Payment Information</h3>
        <p>Card Type: Visa</p>
        <p>Card Number: **** **** **** 1234</p>
        <p>Expiry Date: 12/25</p>
      </div>
      <div className="history-section">
        <h3>Viewing History</h3>
        <ul>
          <li>Movie: Avengers: Endgame</li>
          <li>TV Show: Stranger Things</li>
          <li>TV Show: The Crown</li>
        </ul>
      </div>
      <button className="logout-btn" onClick={logout}>Logout</button>
    </div>
  );
};

export default AccountDetails;
