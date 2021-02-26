import React from 'react';

import logo from '../../img/logo.svg';
import './style.css';

const Navbar = () => {
  return (
    <section className="title-bar" data-responsive-toggle="responsive-menu" data-hide-for="medium">
      <div className="title-bar-left">
        <a href="/">
          <img className='navbar__logo' src={logo} alt="logo"/>
          <span className="title-bar-title">Finance Advisor</span>
        </a>
      </div>
    </section>
  )
};

export default Navbar;