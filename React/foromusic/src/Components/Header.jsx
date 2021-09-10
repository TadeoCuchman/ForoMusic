import React from 'react';
import { Link } from "react-router-dom";

import logo from '../logo.jpg'


const Header = () => {
    return (
      <header>
          <Link to='/'><img src={ logo } id='logo' alt='logo'/></Link>
      </header>
    )
}
  
export default Header;