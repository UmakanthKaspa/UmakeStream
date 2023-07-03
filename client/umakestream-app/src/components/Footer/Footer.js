import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer_content">
        <div className="footer_links">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">TV Shows</a></li>
            <li><a href="#">Movies</a></li>
            <li><a href="#">New & Popular</a></li>
            <li><a href="#">My List</a></li>
          </ul>
          <ul>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="footer_social">
          <ul>
            <li><a href="#"><FontAwesomeIcon icon={faFacebook} /></a></li>
            <li><a href="#"><FontAwesomeIcon icon={faTwitter} /></a></li>
            <li><a href="#"><FontAwesomeIcon icon={faInstagram} /></a></li>
            <li><a href="#"><FontAwesomeIcon icon={faYoutube} /></a></li>
          </ul>
        </div>
      </div>
      <div className="footer_bottom">
        <p>&copy; 2023 Your Netflix Clone. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
