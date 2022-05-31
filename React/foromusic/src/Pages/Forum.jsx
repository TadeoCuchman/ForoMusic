import React from "react";
import { useState, useEffect } from "react";
import ListaDePosts from "../Components/ListaDePosts";
import Popup from "../Components/Popup";
import Searcher from "../Components/Searcher";
import Pagination from "../Components/Pagination";
import "./Forum.css";

const Forum = (props) => {
  const [popup, cambiarPopup] = useState(false);
  const [posts, cambiarPosts] = useState([]);
  const [page, cambiarPage] = useState(1);
  const [numeritos, cambiarNumeritos] = useState(0);

  useEffect(() => {
    cargarPosts();
    cambiarPopup(false);
  }, [page]);

  const cargarPosts = () => {
    fetch("http://localhost:4000/feed/npages")
      .then((response) => response.json())
      .then((data) => {
        cambiarNumeritos(data.nRedondeado);
      }).catch((err) => { console.log('Network not working', err); });


    fetch(`http://localhost:4000/feed/page/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        cambiarPosts(data.postPage);
      }).catch((err) => { console.log('Network not working', err); });
  };

  return (
    <main>
      <Popup
        mostrar={popup}
        setMostrar={cambiarPopup}
        cargarPosts={cargarPosts}
      />

      <Searcher />
      {props.token ?
      <button id="nuevoArtBoton" onClick={() => cambiarPopup(true)}>
        {" "}
        +{" "}
      </button>
      : ''}

      <h1>FEED:</h1>
      <ListaDePosts posts={posts} />
      <br />
      <Pagination
        page={page}
        cambiarPage={cambiarPage}
        numeritos={numeritos}
        cambiarNumeritos={cambiarNumeritos}
      />
      <br />
    </main>
  );
};

export default Forum;
