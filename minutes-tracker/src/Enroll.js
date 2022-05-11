import React, { Component, useState, useEffect} from 'react';
import DropDown from "./components/DropDown";
import Navbar from "./components/Navbar";
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from './services/authService';
import {
    enroll,
    enrollMultiple
  } from "./services/userService";
  import { modalStyle } from "./utils";

const user = getCurrentUser();
  

function Enroll(props) {
    const history = useNavigate();
    const [selectedCourse, setSelectedCourse] = useState([]);

    const handleSelect = (event) => {
        const { target: { value }, } = event;
        setSelectedCourse(
          // On autofill we get a stringified value.
          typeof value === 'string' ? value.split(',') : value,
        );
  };


  function handleSubmit(e) {
    e.preventDefault();
    if(Array.isArray(selectedCourse)) {
      let data = {}
      data.course_ids = selectedCourse;
      const userAndCourse = selectedCourse.map(course => {
        return {
          course: course,
          user: user.id
        }
      })
      data.user_course_ids = userAndCourse;
      console.log(data)
      console.log("Enrolling in mutliple")
      enrollMultiple(data).then(res => {
          console.log("enrolled in multiple courses");
          console.log(res.data)
        props.addCourse(res.data);
        props.closeModal()
      })
    } else {
        enroll(user.id, selectedCourse).then((res) => {
            console.log("enrolled in one course");
            console.log(res.data)
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
        <DropDown selectedCourse={selectedCourse} handleSelect={handleSelect} userId={user.id}/>
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
