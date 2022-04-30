import React from 'react'
import { useState, useEffect } from "react"
import ListaDePosts from '../Components/ListaDePosts'
import Popup from '../Components/Popup'
import Searcher from '../Components/Searcher'
import './Forum.css'



const Forum = () => {
    const [popup, cambiarPopup] = useState(false)
    const [posts, cambiarPosts] = useState([])
    const [page, cambiarPage] = useState(1)
    const [numeritos, cambiarNumeritos] = useState(0)


    useEffect(() => {
        cargarPosts()
        cambiarPopup(false)
    }, [page])

    const cargarPosts = () => {
        fetch('http://localhost:4000/feed/npages')
            .then(response => response.json())
            .then(data => { cambiarNumeritos(data.nRedondeado) })

        fetch(`http://localhost:4000/feed/page/?page=${page}`)
            .then(response => response.json())
            .then(data => { cambiarPosts(data.postPage) })

    }

    const Numerito = (props) => {
        return (
            <button onClick={() => cambiarPage(props.numerito)}> {props.numerito} </button>
        )
    }

    const BotonAntYSig = () => {
        return (
            <div className='antSig'>
                <button onClick={() => {
                    if (page > 1) {
                        (cambiarPage(page - 1))
                    }
                }}>prev</button>

                <button onClick={() => {
                    if (page < numeritos) {
                        cambiarPage(page + 1)
                    }

                }}>next</button>
            </div>
        )
    }

    const Numeritos = () => {
        let componentesNumeritos = []
        let componentesMuchosNum = []
        for (let i = 1; i < numeritos + 1; i++) {
            componentesNumeritos.push(<Numerito numerito={i} key={i} />);
        }
        if (componentesNumeritos.length > 10) {
            componentesMuchosNum = [componentesNumeritos[0], componentesNumeritos[1], componentesNumeritos[2], '...', componentesNumeritos[page], '...', componentesNumeritos[componentesNumeritos.length - 1]]
            return (<div className='numeritos' >{componentesMuchosNum}</div>)
        }
        return (<div className='numeritos'>{componentesNumeritos}</div>)
    }




    return (
        <main>

            <Popup mostrar={popup} setMostrar={cambiarPopup} cargarPosts={cargarPosts} />

            <Searcher />
            <button id="nuevoArtBoton" onClick={() => cambiarPopup(true)}> + </button>



            <h1>FEED:</h1>
            <ListaDePosts posts={posts} />

            <div>
                <Numeritos />
                <BotonAntYSig />
            </div>
            <br />


        </main>
    )
}


export default Forum;

