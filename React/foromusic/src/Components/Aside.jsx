import React from 'react';
import { Link } from "react-router-dom";


const Aside = () => {
    return (
      <aside className="colapso">
        <span id='flechita'></span>
            <ul>
                <Link to='/Profile'><li> Profile </li></Link>
                <Link to='/Comunity'><li> Comunity </li></Link>
                <Link to='/Category'><li> Category's </li></Link>
            </ul>
      </aside> 
    )
}

export default Aside;