import React from 'react';
import logo from '../assets/images/bot-logo.webp';

const Header = () => {
  return (
    <>
      <div className='before-header'>
        <p>Introducing AI Agents to Streamline Your Team’s Work - Book a Demo Now!</p>    
      </div>  
      <header className="header">
        <div className="logo">
          <img src={logo} alt="Smart Bot Logo" />
        </div>
        <nav className="nav">
          <a href="#">Product</a>
          <a href="#">AI Services</a>
          <a href="#">Partnerships</a>
          <a href="#">Resources</a>
        </nav>
        <div className="logins">
          <button className='primaryBtn'>Login</button>
          <button className='secondaryBtn'>Signup</button>
        </div>
      </header>
    </>
  );
};

export default Header;
