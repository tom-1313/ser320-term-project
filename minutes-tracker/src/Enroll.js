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
  

function Enroll(props) {
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
    const user = getCurrentUser();
    console.log(user);
    if(selectedCourse.length > 1) {
        let enrolledCourses = [];
        selectedCourse.map((selectedCourse) => {
        enroll(user.id, selectedCourse)
        .then((res) => {
          enrolledCourses.push(res.data);
          console.log(res);
      })
      .then((res) => {
          console.log(enrolledCourses);
        props.addCourse(enrolledCourses);
        props.closeModal();
      })
      .catch((err) => console.log(err));
      })
      
    }
    else {
        let enrolledCourses = [];
        enroll(user.id, selectedCourse).then((res) => {
            props.addCourse(res.data);
            props.closeModal();
        })
        
    }
        
   
};



    return (
    <div className="Enroll">
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
          <Button variant="primary" type="submit">Enroll</Button>{' '}
          <Button variant="secondary" type="submit" onClick={props.closeModal}>Cancel</Button>{' '}
      </div>
      </div>
    </form>
    </div>
   
  )
  }
  
  export default Enroll;