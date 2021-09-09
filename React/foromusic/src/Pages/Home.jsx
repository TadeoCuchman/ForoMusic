import React from 'react';
import { Link } from "react-router-dom";
import './Home.css'

const Home = () => {
    return (
        <main>

          <div id="home">
            <h1>Welcome to Foromusic</h1>
            
            <p>"Where the music just Happens."</p>
      
            <Link to='/Forum'> <button id='getIn'> Forum  </button></Link>
          </div>
          
          
        </main>
    )
}

export default Home