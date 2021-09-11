import React  from 'react';
import { useState } from 'react';


const Popup = (props) => {
    const [category, changeCategory] = useState(props.category || '')
    const [link, changeLink] = useState(props.link || '')
    const [album, changeAlbum] = useState(props.album || '')
    const [band, changeBand] = useState(props.band || '')
    const [description, changeDescription] = useState(props.description || '')
    const [album_date, changeAlbumDate] = useState(props.album_date || '')
    const firm = localStorage.alias


    const modifyPost = (a) => {
        const modifyBody = {
            category,
            link,
            album,
            band,
            description,
            album_date
        }
        
        fetch(`http://localhost:4000/feed/${a}`, {
                method: 'PUT',
                headers: {
                    "Content-Type" : "application/json",
                    "auth-token" : localStorage.getItem("jwt")
                },body: JSON.stringify(modifyBody)
            }).then((respuesta) => {
                return respuesta.json()
            }).then(function (res) {
                if (!res.succes) {
                    alert (res.message);
                }
            }).then(() => { 
                props.cargarPosts() 
                props.setMostrar(false)
            })
    }


    const posting = () => {
        const postBody = {
            category,
            link,
            album,
            band,
            description,
            album_date,
            firm, 
        }

        fetch('http://localhost:4000/feed', {
              method: "POST",
              headers: {
                     "Content-Type" : "application/json",
                     "auth-token" : localStorage.getItem("jwt")
              },
              body: JSON.stringify(postBody)
        }).then(function(respuesta) {
            return respuesta.json()
        }).then(function (res) {
            if (!res.succes) {
                alert (res.message);
            }
        }).then(() => { 
            props.cargarPosts() 
            props.setMostrar(false)
        })
    }

    return (props.mostrar) ? (
        <div className='popup'>
            <form method = 'POST' id='inputArticulo' action="javascript:void(0);">
                <button id='closePopup' onClick = {() => props.setMostrar(false)}>X</button>
                <h2>Add Your Music:</h2> 
                <span> Category:</span> 
                <input type="text" name="category" value={category} placeholder={'Category'} id='cat' onChange={ (e) => changeCategory(e.target.value) } />
                <span> Link:</span>
                <input type="url" name="link" value={link} placeholder={'Link'} id='link' onChange={ (e) => changeLink(e.target.value) } />
                <span> Album NameBand Name:</span>
                <input type="text" name="album" value={album} placeholder={'Album'} id='alb' onChange={ (e) => changeAlbum(e.target.value) } />
                <span> Band Name:</span>
                <input type="text" name="band" value={band} placeholder={'Band'} id='ban' onChange={ (e) => changeBand(e.target.value) } />
                <span> Description:</span>
                <input type="text"  name="descripcion" value={description} placeholder={'Description'} id='des' onChange={ (e) => changeDescription(e.target.value) } /> 
                <span> Album Date:</span>
                <input type="date" name='albumDate' value={album_date} placeholder={'Album Date$'}  id='albumDate' onChange={ (e) => changeAlbumDate(e.target.value)} />
                <input type="submit" id="submit" onClick = { () => { 
                    if (!props.postToMod){posting()} else { modifyPost(props.postToMod[0].id)} 
                    }}/>
            </form>
        </div>
    ) : "";
}

export default Popup;