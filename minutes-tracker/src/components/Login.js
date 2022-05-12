import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from "../services/authService";
import TextField from "@mui/material/TextField";

function Login() {
  const history = useNavigate();

  const [account, setAccount] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    console.log(account);
    loginUser(account)
      .then((res) => {
        //update the route
        console.log(JSON.stringify(res));
        history("/dashboard");
      })
      .catch((err) => console.log(err));
  }

  function handleChange(e) {
    console.log(e.currentTarget.value);
    const { name, value } = e.target;
    setAccount((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <div className="" id="loginScreen">
      <div id="j-tron" className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Login to an Existing Account</h1>
          <p className="lead">
            Please input an email and password to login into an existing
            account.
          </p>
        </div>
      </div>
      <form id="loginForm" className="text-center" onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Quinnipiac Email"
            name="email"
            value={account.email}
            onChange={handleChange}
          />
        </div>
        <div id="password" className="mb-3">
          <TextField
            label="Password"
            name="password"
            type="password"
            value={account.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label href="" className="link-primary">
            <NavLink className="nav-link" to="/createAccount">
              Not an existing user? Create an account!
            </NavLink>
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
