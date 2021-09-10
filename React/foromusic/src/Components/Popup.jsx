import React  from 'react';
import { useState } from 'react';


const Popup = (props) => {
    const [category, changeCategory] = useState('')
    const [link, changeLink] = useState('')
    const [album, changeAlbum] = useState('')
    const [band, changeBand] = useState('')
    const [description, changeDescription] = useState('')
    const [album_date, changeAlbumDate] = useState('')
    const firm = localStorage.alias


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
                <span>Add Your Music:</span> 
                <input type="text" name="categoria" placeholder="Category" id='cat' onChange={ (e) => changeCategory(e.target.value) } />
                <input type="url" name="link" placeholder="Link" id='lin' onChange={ (e) => changeLink(e.target.value) } />
                <input type="text" name="album" placeholder="Album Name" id='alb' onChange={ (e) => changeAlbum(e.target.value) } />
                <input type="text" name="band" placeholder="Band Name" id='ban' onChange={ (e) => changeBand(e.target.value) } />
                <input type="text"  name="descripcion" placeholder="Description" id='des' onChange={ (e) => changeDescription(e.target.value) } /> 
                <input type="date" name='albumDate' placeholder="Album Date" id='albumDate' onChange={ (e) => changeAlbumDate(e.target.value)} />
                <input type="submit" id="submit" onClick = { () =>  posting()  }/>
            </form>
        </div>
    ) : "";
}

export default Popup;