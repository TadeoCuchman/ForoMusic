import React from 'react';
import { useState, useEffect } from "react"
import './ListOfUsers.css';

const ListOfUsers = () => {
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        chargeUsers()
    }, [])


    const chargeUsers = () => {
        fetch('http://localhost:4000/users/allUsers', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            }).then(response => response.json())
            .then(data => setAllUsers(data.array))
        }
        
        const User = (props) => {
            return (
                <li className='user'>
                <p>{props.name + ' from ' + props.country}</p>
            </li>
        )
    }
    
    
    return ( 
        <div id='divUsers'>
            <ul>
                {(allUsers.length > 0) && allUsers.map(user => { return <User name={user.name} country={user.country} />})}
            </ul> 
        </div>
    )
}

export default ListOfUsers