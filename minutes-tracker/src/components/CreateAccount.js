import React, { useState, useEffect } from 'react'
import { NavLink } from "react-router-dom";
import DropDown from './DropDown';
import { useNavigate } from "react-router-dom";
import { enroll, signup } from '../services/userService';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(course, selectedCourses, theme) {
  return {
    fontWeight:
      selectedCourses.indexOf(course) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

//need all courses and allow multiple selections from drop down (enroll in multiple courses)
function CreateAccount() {
  const history = useNavigate();

  const [account, setAccount] = useState({
    email: "",
    password: "",
    isFaculty: false,
  });
  const [selectedCourse, setSelectedCourse] = useState([]);


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

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCourse(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  function handleSubmit(e) {
    e.preventDefault();

    signup(account)
    .then((res) => {
        //update the route
        console.log(res);
        history("/dashboard");
    })
    .catch((err) => console.log(err));

    selectedCourse.map((selectedCourse) => {
      enroll(account._id, selectedCourse._id)
      .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));
    })
};

  return (
    <div id="createAccountScreen">
      <div id="j-tron" className="jumbotron jumbotron-fluid">
        <div className="container text-center">
          <h1 className="display-4">Create an Account.</h1>
          <p className="lead">Please input and confirm an email and password to create an account.</p>
        </div>
      </div>
        <form id="createAccountForm" onSubmit={handleSubmit}>
          <div id="inputContainer" className="mb-6">
            <label htmlFor="inputEmail" className="form-label">Email address</label>
            <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" name="email" onChange={handleChange}/>
            <div id="emailHelp" className="form-text">A Quinnipiac Email is required.</div>
          </div>
          <div id="inputContainer" className="mb-6">
            <label htmlFor="confirmEmail" className="form-label">Confirm email address</label>
            <input type="email" className="form-control" id="confirmEmail" aria-describedby="confirmEmailHelp" name="email" onChange={handleChange}/>
            <div id="confirmEmailHelp" className="form-text">A matching Quinnipiac email is required.</div>
          </div>
          <div id="inputContainer" className="mb-6">
            <label htmlFor="inputPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="inputPassword" name="password" onChange={handleChange}/>
          </div>
          <div id="inputContainer" className="mb-6">
            <label htmlFor="confirmPassword" className="form-label">Password</label>
            <input type="password" className="form-control" id="confirmPassword" aria-describedby="confirmPasswordHelp" name="password" onChange={handleChange}/>
            <div id="confirmPasswordHelp" className="form-text">A matching password is required.</div>
          </div>
          <div id="numLessons" className="mb-6">
            <DropDown selectedCourse={selectedCourse} handleSelect={handleSelect}/>
          </div>
          <div id="linkContainer" className="mb-6">
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