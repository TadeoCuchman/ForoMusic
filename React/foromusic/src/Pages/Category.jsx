import React from 'react';
import { useState, useEffect } from "react";
import ListaDePosts from '../Components/ListaDePosts';

const Category = () => {
    const [posts, cambiarPosts] = useState([])
    const [category, changeCategory] = useState('')

    useEffect(() => {
        cargarCategorizados()
    }, [category])
    
    const cargarCategorizados = () => {
       
        fetch(`http://localhost:4000/feed/category/?category=${category}`)  
            .then(response => response.json())
            .then(data => {
                cambiarPosts(data.filtrados)
            })
    }
    
    return (
        
        <main>

            <h1>Category's</h1>
            <br></br>
            <select id="select" onChange={a => changeCategory(a.target.value)}>
                <option defaultValue> Category </option>
                <option>rock</option>
                <option>rap</option>
                <option>reggae</option>
            </select>
  
            <div id="feed">
                <ListaDePosts posts = { posts }/>
                
            </div>
            

        </main>
    )
}

export default Category;