
 
 var nuevoArtBoton = document.getElementById('nuevoArtBoton');
 var displayArt = document.getElementById('inputArticulo');
 var popup = document.querySelector('.popup');
 const articuloLista = document.getElementsByClassName('nuevoArticulo');
 const botonSubmit = document.getElementById('submit');
 const feedDiv = document.getElementById('feed');
 const BotonDelete = document.getElementById('delete')
 const muestraPost = document.getElementById('muestraPost')

//cargo los valores de mi nuevo articulo en las variables siguientes
 const category = document.getElementById('cat');
 const link = document.getElementById('lin');
 const album = document.getElementById('alb');
 const band = document.getElementById('ban');
 const descr = document.getElementById('des');
 const firmador = localStorage.alias




//hardcode
var Pagina = 1
//actualizo numero de paginas y botones que voy a necesitar
fetch('http://localhost:4000/feed/')
.then(response => response.json())
.then(data => {
       const nPagina = data.nRedondeado
       const numeritos = document.getElementById("numeritos")
       for (let i = 0; i < nPagina; i++) {
              numeritos.innerHTML += `<button id="bp${i}">${i}</button>`
// carga solamente el eventListener al ultimo elemento, nose como agregar estos listeners a constantes dinamicas
// si se cambia la ruta del fetch a 'http://localhost:4000/feed/npages' 
// invito a cambiar la URL para ver como funcionaria
              document.getElementById(`bp${i}`).addEventListener("click", () =>{
                     Pagina = i
                     console.log(Pagina)
                     render()
              })
       }
})



//cambia el display del popup y lo oculta 
popup.addEventListener("click", function(event){
       if (event.target === popup) {
              popup.style.display = 'none';
       }
       console.log(event);
})

// crea un objeto con las variables del popup
const armarObjetoPost = ((fcategory,flink,falbum,fband,fdescr,firmador) => { 
       const post = {
              category: fcategory.value,
              link: flink.value,
              album: falbum.value,
              band: fband.value,
              description: fdescr.value,
              firma: firmador
       }
       return post;
})

// crea los articulos que vienen desde el servidor
function cargarArts (fcategory,flink,falbum,fband,fdescr, firmador){
       
       const eleArticulo = document.createElement('div');
       const eleCategory = document.createElement('p');
       const eleLink = document.createElement('p');
       const eleAlbum = document.createElement('p');
       const eleBand = document.createElement('h1');
       const eleDescr = document.createElement('p');
       const firma = document.createElement('p')
       
       eleCategory.textContent = fcategory;
       eleLink.textContent = flink;
       eleAlbum.textContent = falbum;
       eleBand.textContent = fband;
       eleDescr.textContent = fdescr;
       firma.textContent = firmador
       
       eleArticulo.appendChild(eleCategory);
       eleArticulo.appendChild(eleLink);
       eleArticulo.appendChild(eleAlbum);
       eleArticulo.appendChild(eleBand);
       eleArticulo.appendChild(eleDescr);
       eleArticulo.appendChild(firma)
       eleArticulo.classList.add('nuevoArticulo');
       feedDiv.appendChild(eleArticulo);
}      

// renderizo mis articulos con los objetos de mi lista Posts en la ruta feed
const render = () => { 
       
       feedDiv.innerHTML = ''
       fetch(`http://localhost:4000/feed/page?page=${Pagina}`)  
       .then(response => response.json())
       .then(data => {
              data.postPage.forEach((x) => cargarArts(x.category, x.link, x.album, x.band, x.description, x.firma));
       })
       
}

//cambia el display del popup y lo muestra
nuevoArtBoton.addEventListener("click", function(){
       popup.style.display = 'grid';
})

// agrega el articulo a la lista Posts en la ruta feed de mi servidor
botonSubmit.addEventListener("click", () => {
       
       const postBody = armarObjetoPost(category,link,album,band,descr);
       
       fetch('http://localhost:4000/feed', {
              method: "POST",
              headers: {
                     "Content-Type" : "application/json",
                     "auth-token" : localStorage.getItem("jwt")
              },
              body: JSON.stringify(postBody)
       })
       render()
})

//no pude implementar bien el delete, 
BotonDelete.addEventListener("click", function(){
       fetch('http://localhost:4000/feed', {
              method: "DELETE",
              headers: {
                     "Content-Type" : "application/json",
                     "auth-token" : localStorage.getItem("jwt")
              },
              body: JSON.stringify(id)
       })
       render()       
})




window.onload = () => {
       // const elementos = document.querySelectorAll('#nuevoArticulo')
       // elementos.forEach((elemento) => {
       //        elemento.addEventListener('click', () => {
       //               elemento.parentNode.removeChild(elemento);
       //        })
       // })
       render()
       if (localStorage.jwt) {
              const logOut = '<button id="logout" class="logout">LogOut</button>'
              nav.innerHTML=''
              nav.innerHTML= localStorage.alias + logOut
              const logout = document.getElementById("logout")
              logout.addEventListener("click", () => {
                localStorage.removeItem('alias')
                localStorage.removeItem('jwt')
                location.href = 'Home.html'
              })   
       }
       
}
