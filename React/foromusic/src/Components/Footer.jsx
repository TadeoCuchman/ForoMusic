import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <footer>
        <ul>
          <Link to='/'><li> Home </li></Link>
          <Link to='/AboutUs'><li> About Us </li></Link>
          <Link to='/Contact'><li> Contact </li></Link>
        </ul>
      </footer>
    )
}

export default Footer;

