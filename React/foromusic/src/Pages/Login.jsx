import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useState } from "react";

const Login = (props) => {
  const [mail, changeMail] = useState("");
  const [password, changePassword] = useState("");
  let history = useHistory();

  const newLogin = () => {
    fetch("http://localhost:4000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    })
      .then(function (respuesta) {
        return respuesta.json();
      })
      .then(function (res) {
        if (res.error) {
          alert(res.error);
        } else {
          alert(res.data);
          localStorage.setItem("jwt", res.token);
          localStorage.setItem("alias", JSON.stringify(res.user.name));
          props.changeToken(localStorage.jwt);
          history.push("/");
        }
      }).catch((err) => { console.log('Network not working', err); });

  };

  return (
    <main>
      <h1>Login</h1>

      <form method="POST" className="forms" action="javascript:void(0);">
        <p>Email:</p>
        <input
          className="logs"
          id="mail"
          type="email"
          name="mail"
          placeholder="Enter your Email"
          onChange={(e) => changeMail(e.target.value)}
        />
        <p>Password:</p>
        <input
          className="logs"
          id="password"
          type="password"
          name="password"
          placeholder="Enter your Password"
          onChange={(e) => changePassword(e.target.value)}
        />
        <button className="logss" type="sumbit" id="login" onClick={newLogin}>
          Login!
        </button>
      </form>

      <p>Don't you have an account yet? Register to add music to our list!</p>
      <Link to="/Register">
        <button className="logss">Register!</button>
      </Link>
    </main>
  );
};

export default Login;
