import React from 'react';


const ListaDePosts = (props) => {
    const posts = props.posts

    return (
        <div id='feed'>
            { posts.map((post) => {
                return ( <Post 
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
            <p>{props.link}</p>
            <p>{props.album}</p>
            <h1>{props.band}</h1>
            <p>{props.description}</p>
            <p>{props.firm}</p>
            <br />
        </div>
    )
}

export default ListaDePosts;