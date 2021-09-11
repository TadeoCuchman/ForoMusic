import React from 'react';

const Settings = () => {
    
    //falta implementar todos los settings que estan abajo (cambio de foto, resetear Email, Nueva constraseña, nuevo alias)

    return (
           <main id='mainSettings'>
                <h1>Settings:</h1>
                
                
                <div id='newMail'>
                    <span>Reset Email:</span>
                    <br/>
                    <input type="email" />
                </div>
               
           
                <div id='newPhoto'>
                    <span>New Profile Photo:</span>
                    <br/>
                    <input type="image" scr='submit.jpg' alt='new profile'/>
                </div>
             
  
                <div id='newPassWord'>
                    <span>Reset Password:</span>
                    <br/>
                    <span> Current Password:</span>
                    <input type="password" />
                    <span> New Password:</span>
                    <input type="password" />
                    <span> Repeat New Password:</span>

                    <input type="password" />
                </div>
     
                <div id='newAlias'>
                    <span>Reset Alias:</span>
                    <br/>
                    <input type='text' />
                </div>
                    

           </main>
        );
}

export default Settings;