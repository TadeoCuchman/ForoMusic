import React from 'react';
import { useState, useEffect } from "react"
import './ListOfUsers.css';
import { Link } from 'react-router-dom'

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
            <Link to={`/User/${props.id}`} className='user'>
                <p>{props.name + ' from ' + props.country}</p>
            </Link>
        )
    }
    
    
    return ( 
        <div id='divUsers'>
            <ul>
                {(allUsers.length > 0) && allUsers.map((user, key) => { return <User key={key} name={user.name} country={user.country} id={user.id}/>})}
            </ul> 
        </div>
    )
}

export default ListOfUsers