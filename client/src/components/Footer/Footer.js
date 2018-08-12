import React from 'react';
import Logo from './Logo';

import './Footer.css';

const Footer = () => {
  return (
    <footer id='footer' className='site-footer'>
      <div className='site-bottom'>
        <div className='container'>
          <div className='row'>
            <Logo />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
