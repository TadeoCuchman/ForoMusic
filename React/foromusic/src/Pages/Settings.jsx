import React from 'react';

const Settings = () => {
    
    //falta implementar todos los settings que estan abajo (cambio de foto, resetear Email, Nueva constraseña, nuevo alias)

    return (
           <main id='mainSettings'>
                <h1>Settings:</h1>
                
                
                <div id='newMail'>
                    <br/>
                    <span>Reset Email</span>
                    <br/>
                    <span>New mail:</span>
                    <input type="email" />
                    <br/>
                    <span>Actual password:</span>
                    <input type="password"/>
                    <br/>
                    <button>Submit</button>
                    <br/>
                </div>
               
           
                <div id='newPhoto'>
                    <br/>
                    <span>New Profile Photo:</span>
                    <br/>
                    <input type="image" src="submit.gif" alt="Submit" width="48" height="48" />
                    <br/>
                    <button>Submit</button>
                    <br/>
                </div>
             
  
                <div id='newPassWord'>
                    <br/>
                    <span>Reset Password:</span>
                    <br/>
                    <span> Current Password:</span>
                    <input type="password" />
                    <span> New Password:</span>
                    <input type="password" />
                    <span> Repeat New Password:</span>
                    <input type="password" />
                    <br/>
                    <button>Submit</button>
                    <br/>
                </div>
     
                <div id='newAlias'>
                    <br/>
                    <span>Reset Alias:</span>
                    <br/>
                    <input type='text' />
                    <br/>
                    <button>Submit</button>
                    <br/>
                </div>
                    

           </main>
        );
}

export default Settings;