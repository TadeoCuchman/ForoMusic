import React from 'react';
import { useState, useEffect } from "react"

// no implementado, la idea es que todos los componentes usen a Numeritos para poder
// ordenar mejor las paginas, pero no me dio el tiempo, perdon :/

const Numeritos = (props) => {
    const [page, cambiarPage] = useState(1)
    const [numeritos, cambiarNumeritos] = useState(0)

    useEffect(() => {
        cargarPosts()
    }, [page])


    const cargarPosts = () => {
        fetch('http://localhost:4000/feed/npages')
            .then(response => response.json())
            .then(data => { cambiarNumeritos(data.nRedondeado) })

        fetch(`http://localhost:4000/feed/page/?page=${page}`)
            .then(response => response.json())
            .then(data => { props.cambiarPosts(data.postPage) })
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
    
    const Numerito = (props) => {
        return (
            <button onClick={() => cambiarPage(props.numerito)}> {props.numerito} </button>
        )
    }


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


export default Numeritos;
