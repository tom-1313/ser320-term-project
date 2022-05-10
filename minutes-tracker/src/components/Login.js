import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { loginUser } from '../services/authService';

function Login() {
  const history = useNavigate();

  const [account, setAccount] = useState({
    email: "",
    password: "",
    isFaculty: false,
  });

  function handleSubmit(e) {
    e.preventDefault();

    loginUser(account)
    .then((res) => {
        //update the route
        console.log(res);
        history("/dashboard");
    })
    .catch((err) => console.log(err));
};

  function handleChange(e) {
    console.log(e.currentTarget.value);
    const { name, value } = e.target;
    setAccount((prev) => {
        return {
          ...prev,
          [name]: value,
        };
    })
};

  return (
    <div className="" id="loginScreen">
      <div id="j-tron" className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Login to an Existing Account.</h1>
          <p className="lead">Please input an email and password to login into an existing account.</p>
        </div>
      </div>
        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
            <div id="emailHelp" className="form-text">A Quinnipiac Email is required.</div>
          </div>
          <div id="password" className="mb-3">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange}/>
          </div>
          <div className="mb-3">
            <label href="" className="link-primary">
              <NavLink className="nav-link" to="/createAccount">
                Not an existing user? Create an account!
              </NavLink>
            </label>
          </div>
          <button type="submit" className="btn btn-dark">Login</button>
      </form>
    </div>
  )
}

export default Login
