import React from "react";
import { useState, useEffect } from "react";

import Pagination from "../Components/Pagination";
import ListaDePosts from "../Components/ListaDePosts";
import Popup from "../Components/Popup";

//usar selected de listadeposts para modificar o suprimir post
const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [page, cambiarPage] = useState(1);
  const [numeritos, cambiarNumeritos] = useState(0);
  const [selected, setSelected] = useState(-1);
  const [popup, cambiarPopup] = useState(false);
  const [postToMod, setPostToMod] = useState([]);

  useEffect(() => {
    chargePosts();
    cambiarPopup(false);
  }, [page]);

  useEffect(() => {
    infoPost(selected);
  }, [selected]);

  const chargePosts = () => {
    fetch(`http://localhost:4000/feed/MyPosts/npages`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => cambiarNumeritos(data.nRedondeado));

    fetch(`http://localhost:4000/feed/MyPosts/?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("jwt"),
      },
    })
      .then((response) => response.json())
      .then((data) => setPosts(data.postsPage));
  };

  const deletePost = (a) => {
    if (postToMod.length > 0) {
      var r = window.confirm(
        `Are you sure you want to Delete this post? "${postToMod[0].album}"`
      );
      if (r === true) {
        fetch(`http://localhost:4000/feed/${a}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("jwt"),
          },
        })
          .then((res) => {
            return res.json();
          })
          .then((res) => {
            if (res.error) {
              alert(res.error);
            } else {
              alert(res.message);
              chargePosts();
            }
          });
      }
    }
  };

  const infoPost = (id) => {
    fetch(`http://localhost:4000/feed/post/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPostToMod(data.array);
      });
  };

  return (
    <main>
      <h1> My Posts:</h1>
      <button
        id="sup"
        onClick={() => {
          deletePost(selected);
        }}
      >
        {" "}
        -{" "}
      </button>

      <button
        id="mod"
        onClick={() => {
          cambiarPopup(true);
        }}
      >
        {" "}
        Mod{" "}
      </button>

      {postToMod.length > 0 && (
        <Popup
          mostrar={popup}
          setMostrar={cambiarPopup}
          cargarPosts={chargePosts}
          postToMod={postToMod}
          category={postToMod[0].category}
          link={postToMod[0].link}
          album={postToMod[0].album}
          band={postToMod[0].band}
          description={postToMod[0].description}
          date={postToMod[0].date}
        />
      )}
      <ListaDePosts setSelected={setSelected} posts={posts} />
      <br />
      <br />
      <Pagination
        page={page}
        cambiarPage={cambiarPage}
        numeritos={numeritos}
        cambiarNumeritos={cambiarNumeritos}
      />
    </main>
  );
};

export default MyPosts;
