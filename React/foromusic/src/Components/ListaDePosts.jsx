import React from 'react';

// agregar que al click despliegue mas informacion y la posibilidad de agregar comentarios


const ListaDePosts = (props) => {
    const posts = props.posts

    return (
        <div id='feed'>
            { posts.map((post) => {
                return ( <Post 
                    key = {post.id}
                    category={post.category} 
                    link={post.link}
                    album={post.album}
                    band={post.band}
                    description={post.description}
                    firm={post.firm}
                    />
                )
            }) }
        </div>
    );
}

const Post = (props) => {
    return (
        <div className='nuevoArticulo'>
            <br />
            <p>{props.category}</p>
            <h3>{props.link}</h3>
            <p>{props.album}</p>
            <p>{props.band}</p>
            <p>{props.description}</p>
            <p>{props.firm}</p>
            <br />
        </div>
    )
}

export default ListaDePosts;