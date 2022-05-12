import React from 'react';
import logo from 'assets/images/travpro-logo.png';

export const Logo = () => {
  return (
    <React.Fragment>
      <img src={logo} alt="TravPro Mobile" width="100" />
      <p>Sales Companion web documentation</p>
    </React.Fragment>
  );
};
