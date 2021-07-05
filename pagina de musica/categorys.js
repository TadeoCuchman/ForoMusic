const feedDiv = document.getElementById('feed');


const categoria = document.getElementById('select')
const categorizados = []

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

// trae los posts que filtrando por category
categoria.addEventListener("change", (e) => {
    feedDiv.innerHTML = ''
    fetch(`http://localhost:4000/feed/category/?category=${categoria.value}`)  
            .then(response => response.json())
            .then(data => {
                data.filtrados.forEach((x) => cargarArts(x.category, x.link, x.album, x.band, x.description, x.firma));
            })
})


window.onload = () => {
    // solo hice el control desde el front end
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