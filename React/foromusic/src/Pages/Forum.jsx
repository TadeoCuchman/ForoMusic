import React from 'react';
import { useState, useEffect } from "react";
import ListaDePosts from '../Components/ListaDePosts';
import Popup from '../Components/Popup';






const Forum = () => {
    const [popup, cambiarPopup] = useState(false)
    const [posts, cambiarPosts] = useState([])
    const [page, cambiarPage] = useState(1)
    const [numeritos, cambiarNumeritos] = useState(0)
    const [selected, cambiarSelected] = useState(0)
    //hacer que el selected tenga un id de post seleccionado y este cambie de clase *= que se haga mas grande y con mas informacion mostrada
    
    useEffect(() => {
        cargarPosts()
    }, [page])

    const cargarPosts = () => {
        fetch('http://localhost:4000/feed/npages')
            .then(response => response.json())
            .then(data => {  cambiarNumeritos(data.nRedondeado) })

        fetch(`http://localhost:4000/feed/page/?page=${page}`)
            .then(response => response.json())
            .then(data => { cambiarPosts(data.postPage) })
    }

    const Numerito = (props) => {
        return (
            <button id='numeritos' onClick={() => cambiarPage(props.numerito) }> {props.numerito} </button>
        )
    }

    const BotonAntYSig = () => {
        return (
            <div>
                <button onClick={()=>{
                    if (page > 1){
                        (cambiarPage(page-1))
                    }
                }}>prev</button>
                
                <button onClick={()=>{
                    if (page < numeritos){
                        cambiarPage(page+1)
                    }

                }}>next</button>

               
        

            </div>
        )
    }
    
    const Numeritos = () => {   
        let componentesNumeritos = []
        let componentesMuchosNum = []
        for (let i = 1; i < numeritos + 1; i++) {
            componentesNumeritos.push( <Numerito numerito={i} key={i}/> );
        }
        if (componentesNumeritos.length > 10){
            componentesMuchosNum = [componentesNumeritos[0], componentesNumeritos[1], componentesNumeritos[2], '...', componentesNumeritos[page],'...' , componentesNumeritos[componentesNumeritos.length-1]]
            return (componentesMuchosNum)
        } 
        return (componentesNumeritos)
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
        <BotonAntYSig />
        <br />


        </main>
    )
}


export default Forum;