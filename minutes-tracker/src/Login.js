import React from 'react'

function Login() {
  return (
    <div id="loginScreen">
      <div id="j-tron" className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Login as an Existing User.</h1>
          <p className="lead">Please input an email and password to login.</p>
        </div>
      </div>
        <form id="loginForm">
          <div className="mb-3">
            <label for="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">A Quinnipiac Email is required.</div>
          </div>
          <div className="mb-3">
            <label for="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword"/>
          </div>
          <div className="mb-3">
            <label href="#" class="link-primary">Not an Existing User? Create an Account!</label>
          </div>
          <button type="submit" className="btn btn-dark">Login</button>
      </form>
    </div>
  )
}

export default Login

