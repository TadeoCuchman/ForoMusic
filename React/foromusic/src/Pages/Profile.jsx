import React from 'react';

const Profile = () => {
    
    
    // falta implementar Profile con toda la informacion visible para otros pefiles
    
    
    
    return (
           <main>
               <br />
               <p>Profile: {localStorage.alias}</p> 
               <div>
                   <span>photo</span>
                   <span>changephoto</span>
                   <br />
                   
               </div>
               <div>
                   Comentarios hechos
               </div>
           </main>
        );
}

export default Profile