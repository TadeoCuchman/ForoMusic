import React from 'react';
import { Link } from "react-router-dom";
import { useState } from "react"


// colocar mas contenido 
//hacer q los links esten dentro de un div para q desplieguen mas links en un hover
//
const Aside = () => {
  
  return (

    <aside className="colapso">
      <div className="profilAside">
        <button>PROFILE</button>
        
        
        
        
        <span id='flechita' >{'- >'}</span>
        <span id='flechita' >{'- > '}</span>
        <span id='flechita' >{'- > '}</span>

      </div>

      <AsideLinks />
      
  
      <div className="underAside">

      </div>

    </aside> 
    )

  }

  const AsideLinks = (props) => {
    return (
      <ul className="linksAside">
        <AsideLink to='Profile'/>
        <AsideLink to='Comunity'/>
        <AsideLink to='Category'/>
        
      </ul>
    )
  }

  const AsideLink = (props) => {
    const [open, cambiarOpen] = useState(false)

    return(
      <>
        <li className="asidePath"><Link to={props.to} onClick = {() => cambiarOpen(!open)}>{props.to} </Link></li>
        {open && props.children}
      </>
    )
  }

export default Aside;