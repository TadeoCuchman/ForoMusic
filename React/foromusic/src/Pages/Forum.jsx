import React from 'react';
import { useState, useEffect } from "react";
import ListaDePosts from '../Components/ListaDePosts';
import Popup from '../Components/Popup';






const Forum = () => {
    const [popup, cambiarPopup] = useState(false)
    const [posts, cambiarPosts] = useState([])
    const [page, cambiarPage] = useState(1)
    const [numeritos, cambiarNumeritos] = useState(1)
    
    useEffect(() => {
        cargarPosts()
    }, [])

    const cargarPosts = () => {
        fetch('http://localhost:4000/feed/npages')
            .then(response => response.json())
            .then(data => {  cambiarNumeritos(data.nRedondeado) 
            
                console.log(numeritos)
            })

        fetch(`http://localhost:4000/feed/page/?page=${page}`)
            .then(response => response.json())
            .then(data => { cambiarPosts(data.postPage) })
    }

    const Numerito = (props) => {
        return (
            <button onClick={ cambiarPage(props.numerito)}>{props.numerito}</button>
        )
    
    }
    
    const Numeritos = () => {
        for (let i = 0; i < numeritos; i++){
            return (<Numerito numerito={i} />)
        }
    }


    

    return ( 
        <main>
        
        <Popup mostrar= { popup } setMostrar = { cambiarPopup } cargarPosts = { cargarPosts } />
        
        <button id="nuevoArtBoton" onClick = {() => cambiarPopup(true)}> + </button>

        <button id="delete" onClick = {() => {

        }}>-</button>


        <h1>FEED:</h1>
        
        <ListaDePosts posts = {posts} />

        <Numeritos />

        </main>
    )
}


export default Forum;