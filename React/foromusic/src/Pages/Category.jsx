import React from 'react';
import { useState, useEffect } from "react";
import ListaDePosts from '../Components/ListaDePosts';

const Category = () => {
    const [posts, cambiarPosts] = useState([])
    const [category, changeCategory] = useState('')
    const [categorys, setCategorys] = useState([])

    // falta hacer que no se duplique la categoria por mayuscula o minuscula

    useEffect(() => {
        cargarCategorizados()
    }, [category])
    
    
    const cargarCategorizados = () => {

        fetch(`http://localhost:4000/feed/category/?category=${category}`)  
            .then(response => response.json())
            .then(data => {
                cambiarPosts(data.filtrados)
            })

        fetch('http://localhost:4000/feed/allCates')
            .then(response => response.json())
            .then(data => { 
                setCategorys(data.array)
            })
    }
    
    return (
        
        <main>

            <h1>Category's</h1>
            <select id="select" onChange={a => changeCategory(a.target.value)}>
                <option defaultValue> Category </option>
                {categorys.map((cat, key) => { return <Options key={key} category = {cat.category} />}) }
            </select>
  
            <div id="feed">
                <ListaDePosts posts = { posts }/>
                
            </div>
            

        </main>
    )

}

const Options = (props) => {
    return (
        <option key={props.key} value={props.category}> {props.category} </option>
    )
}

export default Category;