import React from 'react';
import {useState} from 'react';
import { Link } from "react-router-dom";


const Post = (props) => {

    return (
        <div className={` nuevoArticulo ${props.selected ? 'nuevoArticuloExpandido' : ''}`}
        onClick={() => { if (props.selected) {props.cambiarSelected(-1)} else {props.cambiarSelected(props.id)} }}>
            <div className='title'>
                <h1>{props.album}</h1>
                <p>Band: {props.band}</p>
            </div>
           
            <div className='info'>
            
                 {props.selected && 
                <>
                    <h3><a href={`${props.link}`} target="_blank" rel="noreferrer">{props.link}</a></h3>
                    <p>Album date: {props.album_date}</p>
                    <p>Category: {props.category}</p>
                    <p>{props.description}</p>
                    <div className='comments'>
                        <Link to={`/Post/${props.id}`} id='comments' >Comments</Link>    
                    </div>        
                    <Link id='firm' to={`/User/${props.user_id}`}>{props.firm}</Link>
                 </>}
            </div>
           
                
            
            
            
            
        </div>
    )
}

const ListaDePosts = (props) => {
    const posts = props.posts
    const [selected, cambiarSelected] = useState(-1)

    if (posts){
        return (
            <div id='feed'>
                { posts.map((post) => {
                    return ( <Post
                        id={post.id}
                        user_id={post.user_id}
                        key={post.id}
                        category={post.category} 
                        link={post.link}
                        album={post.album}
                        band={post.band}
                        description={post.description}
                        firm={post.firm}
                        albumDate={post.album_date}
                        selected={post.id === selected}
                        cambiarSelected={cambiarSelected}
                        />
                    )
                }) }
            </div>
        )
    } else { return [] }
}



export default ListaDePosts;