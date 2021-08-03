import React from 'react';
import { Link, useHistory } from 'react-router-dom'
import { useState } from "react"

const Nav = (props) => {
  let history = useHistory();
 
  if (props.token) {
    return (
      <nav id='nav'>
        <span>{localStorage.alias}</span>
        <br></br>
        <button id="logout" className="logout" onClick={() => { 
          localStorage.removeItem('alias')
          localStorage.removeItem('jwt')
          props.changeToken(localStorage.jwt)
          history.push('/')}}> LogOut </button>
      </nav>
    );
  }else {
    return (
      <nav id="nav">
            <Link to='/Register'><button className='logss'> Register! </button></Link>
            <Link to='/Login'><button className="logss"> Login! </button></Link>  
      </nav>
    );
  }
} 

const Buscador = () => {
  return(
  <>  
    <input type='text' id='buscador'/>
    <button className='logout'>Search</button>
    <span>  ............  </span>
  </>
  )
}
export default Nav;