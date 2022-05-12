import React, { Component } from 'react'
import ReactDOM from "react-dom";
//import * as Icon from 'react-bootstrap-icons';


function Signup() {
  return (
    <div className="signup">
        <div>
          <header className="p-5 text-center" id="header">
            <h1 id="title">Create Account</h1>
          </header>  
        </div>
        <div>
        {/* Form */}
        <form id="form" className="needs-validation" novalidate>

            {/* Email Input */}
            <div className="form-group d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
              <label for="inputEmail" class="col-sm-2 col-form-label-lg" id="emailLabel">Email:</label>
              <div className="col-sm-10">
                <input required type="email" class="form-control form-control-lg" id="inputEmail" placeholder="example@quinnipiac.edu"/>
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group d-flex flex-row align-items-center mb-4">
            <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                <label for="inputPassword" className="col-sm-2 col-form-label-lg" id="passwordLabel">Password:</label>
                <div class="col-sm-10">
                  <input required type="password" className="form-control form-control-lg" id="inputPassword" placeholder="Password"/>
                </div>
              </div>

            {/* Confirm Password Input */}
            <div className="form-group d-flex flex-row align-items-center mb-4">
            <i className="fas fa-key fa-lg me-3 fa-fw"></i>
              <label for="inputConfirmPassword" class="col-sm-2 col-form-label-lg" id="passwordLabel">Confirm Password:</label>
              <div className="col-sm-10">
                <input required type="password" className="form-control form-control-lg" id="inputConfirmPassword" placeholder="Confirm Password"/>
              </div>
            </div>

        </form>
    </div>
</div>
  )
}

export default Signup
