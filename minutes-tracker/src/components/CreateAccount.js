import React from 'react'
import { NavLink } from "react-router-dom";

//need all courses and allow multiple selections from drop down (enroll in multiple courses)
function CreateAccount() {
  return (
    <div id="createAccountScreen">
      <div id="j-tron" className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Create an Account.</h1>
          <p className="lead">Please input and confirm an email and password to create an account.</p>
        </div>
      </div>
        <form id="createAccountForm">
          <div className="mb-5">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">A Quinnipiac Email is required.</div>
          </div>
          <div className="mb-5">
            <label htmlFor="confirmEmail" className="form-label">Confirm email address</label>
            <input type="email" className="form-control" id="confirmEmail" aria-describedby="confirmEmailHelp"/>
            <div id="confirmEmailHelp" className="form-text">A matching Quinnipiac email is required.</div>
          </div>
          <div className="mb-5">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword"/>
          </div>
          <div className="mb-5">
            <label htmlFor="confirmPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp"/>
            <div id="confirmPasswordHelp" className="form-text">A matching password is required.</div>
          </div>
          <div className="mb-5">
            <label href="" className="link-primary">
              <NavLink className="nav-link" to="/login">
                Already have an existing account? Login here!              
              </NavLink>
            </label>
          </div>
          <button type="submit" className="btn btn-dark">Create Account</button>
      </form>
    </div>
  )
}

export default CreateAccount