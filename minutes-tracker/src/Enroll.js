import React, { Component, useState, useEffect} from 'react';
import DropDown from "./components/DropDown";
import Navbar from "./components/Navbar";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from './services/authService';
import {
    getEnrolled,
    getCreatedCourses,
    deleteCourse,
    enroll
  } from "./services/userService";
  import { modalStyle } from "./utils";
  

function Enroll() {
    const history = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState([]);
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

    enroll(getCurrentUser()._id, selectedCourse._id)
    .then((res) => {
        //update the state
        console.log(JSON.stringify(res));
        history("/dashboard");
    })
    .catch((err) => console.log(err));
};

//   function enrollInCourses() {
//     selectedCourse.map((selectedCourse) => {
//         enroll(account._id, selectedCourse._id)
//         .then((res) => {
//           console.log(res);
//       })
//       .catch((err) => console.log(err));
//       })
//   }

    return (
    <div className="Enroll">
        <Navbar isFaculty={false} />=
        <div className="text-center jumbotron jumbotron-fluid">
        <h2 id="course-list">Course List</h2>
        </div>
    <form id="enrollForm" onSubmit={handleSubmit}>
      <div>
        <div className="text-center">
        <p className="text-center">
          Please select the courses you need to be enrolled in.
        </p>
        <DropDown selectedCourse={selectedCourse} handleSelect={handleSelect}/>
      </div>
      <div className="text-center">
          <Button variant="light" type="submit">Enroll</Button>{' '}
      </div>
      </div>
    </form>
    </div>
   
  )
  }
  
  export default Enroll;