

const register = document.getElementById('register')

const rname = document.getElementById('rname')
const rmail = document.getElementById('rmail')
const rpassword = document.getElementById('rpassword')

// manda un nuevo usuario cuando se registra
register.addEventListener("click", (e) => {
  e.preventDefault();
      
  const user = {
      name: rname.value,
      mail: rmail.value,
      password: rpassword.value,
      salt: ''
  }

  fetch('http://localhost:4000/users/register',{
      method: "POST",
      headers:{
          "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    }).then(function(respuesta) {
        return respuesta.json();
    }).then(function (res) {
        if (res.success === false) {
            alert ('Something happens');
        } else {
            alert ('Successfull Register');
            location.href = 'Login.html'
        }
        })
})