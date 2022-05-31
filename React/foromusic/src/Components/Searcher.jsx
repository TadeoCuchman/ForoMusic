import React from 'react';
import { useState, useEffect} from 'react';
import { Link } from "react-router-dom";

const Searcher = () => {
    const [research, setResearch] = useState('')
    const [posts, setPosts] = useState([])

    useEffect(() => {
        if(research){
        GoResearch()}
    }, [research])

    const GoResearch = () => {
        fetch(`http://localhost:4000/feed/search/?search=${research}`)
            .then(response => response.json())
            .then(data => { setPosts(data.array) })
            .catch((err) => { console.log('Network not working', err); });
    }

    return (
        <div>
            <input type='text' id='searcher' placeholder='Research' onChange={(e) => {setResearch(e.target.value)}}/>
            { (posts.length > 0) && (research !== '') && 
            <ul id='searched'>
                { posts.map((post, key) => { if (key < 8) {return <Link to={`/Post/${post.id}`} ><li>{post.band + ' | ' + post.album }</li></Link>}})}
            </ul>}
        </div>
    )
}

export default Searcher;

