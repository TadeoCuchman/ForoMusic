import React from 'react';
import { useState, useEffect } from "react";
import ListaDePosts from '../Components/ListaDePosts';

const ByDates = () => {
    const [posts, cambiarPosts] = useState([])
    const [byDate, setByDate] = useState('')

    useEffect(() => {
        cargarCategorizados()
    }, [byDate])
    
    
    const cargarCategorizados = () => {

        fetch(`http://localhost:4000/feed/Date/?year=${byDate}`)  
            .then(response => response.json())
            .then(data => {
                cambiarPosts(data.filtrados)
            })     
        
    }
    
    return (
        
        <main>

            <h1>Dates:</h1>
            <span>Please introduse a valid year.</span>
            <br />
            <br />  
            <input onChange={a => {if (a.target.value.length === 4) {setByDate(a.target.value)} }} />

            <div id="feed">
                <ListaDePosts posts = { posts }/>
            </div>
            

        </main>
    )
}


export default ByDates;