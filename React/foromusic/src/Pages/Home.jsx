import React from 'react';
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <main>

          <div id="home">
            <h1>Welcome to Foromusic</h1>
            
            <p>"Where the music just Happens."</p>
      
            <button id='getIn'>
              <Link to='/Forum'> Forum </Link> </button>;
          </div>
          
          
        </main>
    )
}

export default Home