import React from 'react';
import { useState } from 'react';
import { useHistory } from "react-router-dom";



const Register = () => {    
    const [user, changeUser] = useState('')
    const [mail, changeMail] = useState('')
    const [password, changePassword] = useState('')
    let history = useHistory();
    
    const postNewUser = () => {
        const newUser = {
            name: user,
            mail: mail,
            password: password,
            salt: ''
        }
      
        fetch('http://localhost:4000/users/register',{
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newUser)
          }).then(function(respuesta) {
              return respuesta.json();
          }).then(function (res) {
              if (res.success === false) {
                  alert ('Something happens');
              } else {
                  alert ('Successfull Register');
                  history.push('/Login')                  
              }
            })
    }
    
    return (
        <main>
            <h1>Register</h1>

            <form method="POST" action="javascript:void(0);" className="forms">
                <p>Email:</p>
                <input className="logs" id="rmail" type="email" name="rmail" placeholder="Enter your Email"  onChange={(e) => changeMail(e.target.value)}/>
                <p>Nickname:</p>
                <input className="logs" id="rname" type="text" name="rname" placeholder="Enter your Nickname"  onChange={(e) => changeUser(e.target.value)}/>
                <p>Password:</p>
                <input className="logs" id="rpassword" type="password" name="rpassword" placeholder="Enter a Password"  onChange={(e) => changePassword(e.target.value)}/>
                <button className="logss" type="sumbit" id="register" onClick={ () => { postNewUser() } } >Register!</button>
            </form>
        </main>
    )
}

export default Register;