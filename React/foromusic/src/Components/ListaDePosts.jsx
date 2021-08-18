import React from 'react';
import {useState} from 'react';

//hacer que el selected tenga un id de post seleccionado y este cambie de clase *= que se haga mas grande y con mas informacion mostrada
// agregar que al click despliegue mas informacion y la posibilidad de agregar comentarios
// hacer que los post hagan una busqueda a youtube y despliegue informacion como una foto


const ListaDePosts = (props) => {
    const posts = props.posts
    const [selected, cambiarSelected] = useState(-1)

    return (
        <div id='feed'>
            { posts.map((post) => {
                return ( <Post
                    id = {post.id}
                    key = {post.id}
                    category={post.category} 
                    link={post.link}
                    album={post.album}
                    band={post.band}
                    description={post.description}
                    firm={post.firm}
                    selected={post.id === selected}
                    cambiarSelected={cambiarSelected}
                    />
                )
            }) }
        </div>
    );
}

const Post = (props) => {

    return (
        <div className={` nuevoArticulo ${props.selected ? 'nuevoArticuloExpandido' : ''}`}
        onClick={() => props.cambiarSelected(props.id)}>
            <br />
            <p>{props.category}</p>
            <h3>{props.link}</h3>
            <p>{props.album}</p>
            {props.selected && 
            <>
            <p>{props.band}</p>
            <p>{props.description}</p>
            <p>{props.firm}</p>
            </>}
            <br />
        </div>
    )
}

export default ListaDePosts;