import React from 'react';
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Post = () => {
    const { id } = useParams('')
    const [post, setPost] = useState([])
    const [comment, setComment] = useState('')
    const [commentsDB, setCommentsDB] = useState([])
    
    useEffect(() => {
        chargePost()
        chargeCommentsDB()
    },[])


    
    const chargePost = () => {
        fetch(`http://localhost:4000/feed/post/${id}`)
            .then(response => response.json())
            .then(data => setPost(data.array) )
        }
    
    const postingComment = () => {
        const commentBody = { comment }
        
        fetch(`http://localhost:4000/comments/${id}`, {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
            body: JSON.stringify(commentBody)
        }).then((res) => {
            return res.json()
        }).then((res) => {
            if (res.error) {
                alert (res.error)
            } else { chargeCommentsDB() }
        })
    }

    const chargeCommentsDB = () => {
        fetch(`http://localhost:4000/comments/${id}`)
            .then(response => response.json())
            .then(data => setCommentsDB(data.array))  
    }

    const deleteComment = (a) => {
        fetch(`http://localhost:4000/comments/${a}`, {
            method: 'DELETE',
            headers: {
                "Content-Type" : "application/json",
                "auth-token" : localStorage.getItem("jwt")
            },
        }).then((res) => {
            return res.json()
        }).then((res) => {
            if (res.error) {
                alert (res.error)
            } else { 
                alert(res.message)
                chargeCommentsDB() }
        })
    }

    
    return (
           <main id='mainPost'>
               {(post[0]) && 
               <div id='completePost'>
                    
                    <div className='infoPost'>
                        <h1>{post[0].album}</h1>
                        <h3>Band: {post[0].band}</h3>
                        <h3>Category: {post[0].category}</h3>
                        <h3><a href={`${post[0].link}`} target="_blank" rel="noreferrer">{post[0].link}</a></h3>
                        <h3>Album date: {post[0].album}</h3>
                        <h4>Description: {post[0].description}</h4>
                    </div>
                    <div className='comments'>
                        <div className='infoComments'>
                            <Link to={`/User/${post[0].user_id}`}>{post[0].firm}</Link>
                            <p>Comments:</p>
                        </div>
                        <div className='commentsDB'>
                            {(commentsDB) &&
                            <ul className='CommentsUl'>
                                {commentsDB.map((a, key) => <li key={key} className='comment' onClick={
                                    () => deleteComment(a.id)
                                }> <span>{a.name}:</span><br/>{a.comment}<br/><span className='date'>{a.date}</span></li>)}
                            </ul>}
                        </div>
                        <form id='newComment' method='post' action="javascript:void(0);">
                            <textarea onChange={(a) => setComment(a.target.value)}/>
                            <input id='submitComment' type="submit" value="Submit" onClick={ () => postingComment() }/>
                        </form>
                    </div>
               </div>}
           </main>
        );
}

export default Post;