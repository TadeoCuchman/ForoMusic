
 
 var nuevoArtBoton = document.getElementById('nuevoArtBoton');
 var displayArt = document.getElementById('inputArticulo');
 var popup = document.querySelector('.popup');
 const articuloLista = document.getElementsByClassName('nuevoArticulo');
 const botonSubmit = document.getElementById('submit');
 const feedDiv = document.getElementById('feed');


 var category = document.getElementById('cat');
 var link = document.getElementById('lin');
 var album = document.getElementById('alb');
 var band = document.getElementById('ban');
 var descr = document.getElementById('des');




nuevoArtBoton.addEventListener("click", function(){
       popup.style.display = 'grid';
})

popup.addEventListener("click", function(event){
       if (event.target === popup) {
              popup.style.display = 'none';
       }
       console.log(event);
})

function crearNuevoArt (fcategory,flink,falbum,fband,fdescr){
       const eleArticulo = document.createElement('div');
       const eleCategory = document.createElement('p');
       const eleLink = document.createElement('p');
       const eleAlbum = document.createElement('p');
       const eleBand = document.createElement('h1');
       const eleDescr = document.createElement('p');

       eleCategory.textContent = fcategory.value;
       eleLink.textContent = flink.value;
       eleAlbum.textContent = falbum.value;
       eleBand.textContent = fband.value;
       eleDescr.textContent = fdescr.value;

       eleArticulo.appendChild(eleCategory);
       eleArticulo.appendChild(eleLink);
       eleArticulo.appendChild(eleAlbum);
       eleArticulo.appendChild(eleBand);
       eleArticulo.appendChild(eleDescr);
       eleArticulo.classList.add('nuevoArticulo');
       feedDiv.appendChild(eleArticulo);

} 
const armarObjetoPost = ((fcategory,flink,falbum,fband,fdescr) => { 
       const post = {
              category: fcategory.value,
              link: flink.value,
              album: falbum.value,
              band: fband.value,
              description: fdescr.value
       }
       return post;
})

function cargarArts (fcategory,flink,falbum,fband,fdescr){
       const eleArticulo = document.createElement('div');
       const eleCategory = document.createElement('p');
       const eleLink = document.createElement('p');
       const eleAlbum = document.createElement('p');
       const eleBand = document.createElement('h1');
       const eleDescr = document.createElement('p');

       eleCategory.textContent = fcategory;
       eleLink.textContent = flink;
       eleAlbum.textContent = falbum;
       eleBand.textContent = fband;
       eleDescr.textContent = fdescr;

       eleArticulo.appendChild(eleCategory);
       eleArticulo.appendChild(eleLink);
       eleArticulo.appendChild(eleAlbum);
       eleArticulo.appendChild(eleBand);
       eleArticulo.appendChild(eleDescr);
       eleArticulo.classList.add('nuevoArticulo');
       feedDiv.appendChild(eleArticulo);
}  



botonSubmit.addEventListener("click", function(e){
       e.preventDefault();
       crearNuevoArt(category,link,album,band,descr);

       const postBody = armarObjetoPost(category,link,album,band,descr);
       
       fetch('http://localhost:4000/feed', {
              method: "POST",
              headers: {
                     "Content-Type": "application/json"
              },
              body: JSON.stringify(postBody)
       })
})



const render = () => {
       fetch('http://localhost:4000/feed')  
            .then(response => response.json())
            .then(data => {
              data.Posts.forEach((x) => cargarArts(x.category, x.link, x.album, x.band, x.description ));
              })
}
       
       
window.onload = () => {
       const elementos = document.querySelectorAll('#nuevoArticulo')
       elementos.forEach((elemento) => {
              elemento.addEventListener('click', () => {
                     elemento.parentNode.removeChild(elemento);
              })
       })
       render()
              

}
