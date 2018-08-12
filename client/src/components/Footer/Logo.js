import React from 'react';

import FooterLogo from '../../assets/images/logo.png';

class Logo extends React.Component {
  render() {
    return (
      <div className='widget-home'>
        <div className='widget'>
          <div className='textwidget'>
            <p>
              <img className='site-brandl-logo-footer' src={FooterLogo} alt='' />
            </p>
          </div>
        </div>
        <div className='copyright'>© 2018 by Vivek Nayyar. All rights reserved</div>
      </div>
    );
  }
}

export default Logo;
