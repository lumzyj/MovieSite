import React from 'react';
import './Footer.css'; 
import twitterIcon from '../assets/twitter.svg';
import youtubeIcon from '../assets/youtube.svg';
import instagramIcon from '../assets/instagram.svg';
import facebookIcon from '../assets/facebook.svg';

const Footer = () => {
  return (
    <footer className="footer mt-20">
      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" className="icon" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="icon" />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" className="icon" />
        </a>
        <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={youtubeIcon} alt="YouTube" className="icon" />
        </a>
      </div>
      <div className="links">
        <a href="/conditions">Conditions of Use</a>
        <a href="/privacy">Privacy & Policy</a>
        <a href="/press">Press Room</a>
      </div>
      <div className="copyright">
        © 2023 MovieBox by Olumide Oni
      </div>
    </footer>
  );
};

export default Footer;


