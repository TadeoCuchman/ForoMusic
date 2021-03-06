import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react"
import unknown from '../unknown.jpg'


const Aside = () => {
  
  return (

    <aside className="colapso">
      
      
      <div className="profilAside">
        {!localStorage.jwt && 
        <span id='notLogged'>No User Logged</span>
        }
        {localStorage.jwt && 
        <>
        <span id='profilname'>{localStorage.alias}</span>
        <img id='profilphoto' src={unknown} alt='profil'/>
        </>
        }
        <span id='flechita' >{'- >'}</span>
        <span id='flechita' >{'- >'}</span>
      </div>
      <div id='midAside'>
        <AsideLinks />
      </div>
  
      <div className="underAside">
        <br/>
        <span id='underQuote'>∞ Where magic beguns ∞</span>
      </div>

    </aside> 
    )

  }

  const AsideLinks = (props) => {
    return (
      <ul className="linksAside">
        <AsideLink to='Profile'><DropDown to='/Settings' goto='Settings'/><DropDown to='/Profile' goto='MyProfile'/><DropDown to='/MyPosts' goto='MyPosts'/><DropDown to='/Support' goto='Support'/></AsideLink>
        <AsideLink to='Comunity'><DropDown to='/AllUsers' goto='AllUsers' /><DropDown to='/Trending' goto='Trending'/> <DropDown to='/Discover' goto='Discover'/></AsideLink>
        <AsideLink to='Categorys'><DropDown to='/Dates' goto='Dates'/><DropDown to='/Category' goto='Musical Gender'/></AsideLink>
      </ul>
    )
  }

  const AsideLink = (props) => {
    const [open, cambiarOpen] = useState(false)

    return (
      <>
        <li className="asidePath" onClick = {() => {
          cambiarOpen(!open)
          setTimeout(() => { cambiarOpen(false)}, 30000)
        }}>{props.to}</li>
        {open && props.children}
      </>
    )
  }

  const DropDown = (props) => {
      return (
        <Link className='dropDown' to={props.to}>
          <span>∞{props.goto}</span>
        </Link>)
    }


export default Aside;