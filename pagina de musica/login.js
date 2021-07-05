

const login = document.getElementById('login')

const mail = document.getElementById('mail')
const password = document.getElementById('password')

const nav = document.getElementById('nav')

// espera un token cuando el login es exitoso
login.addEventListener("click", (e) => {
  e.preventDefault();
  fetch("http://localhost:4000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      mail: mail.value, 
      password: password.value
    })
  }).then(function(respuesta) {
    return respuesta.json();
  }).then(function (res) {

    
    if (res.error) {
      alert ('Something happens');
    } else {
      alert ('Successfull Login');
      localStorage.setItem('jwt', res.token);
      localStorage.setItem('alias', JSON.stringify(res.user.name))
      location.href = 'Home.html'
    }

  });
})

// redirecciona si ya esta logueado, solo está hecho el control desde el front end
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
