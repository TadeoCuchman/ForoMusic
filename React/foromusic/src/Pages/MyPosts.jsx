import React from 'react';
import { useState, useEffect } from "react"
import ListaDePosts from '../Components/ListaDePosts'



//usar selected de listadeposts para modificar o suprimir post
const MyPosts = () => {
    const [posts, setPosts] = useState([])
    const [selected, setSelected] = useState(-1)

    useEffect(() => {
        charchePosts()
    },[])

    const charchePosts = () => {
        fetch('http://localhost:4000/feed/MyPosts', {
            method: "GET",
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            }).then(response => response.json())
            .then(data => setPosts(data.array)) 
    }





    return (
           <main>
                <h1> My Posts:</h1>
                <button id='sup' onClick={() => { 

                }}> - </button>

                <button id='mod' onclick={() => { 

                }}> Mod </button>

                

                
                <ListaDePosts setSelected={ setSelected } posts= { posts } />
              

           </main>
        );
}

export default MyPosts;