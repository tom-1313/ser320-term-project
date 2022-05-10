import React, { Component } from 'react';
//import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import {
    getEnrolled,
    getCreatedCourses,
    deleteCourse,
  } from "./services/userService";
  import { modalStyle } from "./utils";
  

function Enroll() {
    return (
      <div className="Enroll">
        <div className="text-center">
            <h2 id="course-list">Course List</h2>
        </div>
      <div className="container" id="formcontainer">
        <div className="card card-form" id="card-bkgd">
        <p className="text-center">
          Please select the courses you need to be enrolled in.
        </p>
          {/* <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action text-center" data-toggle="modal" data-target="#myModal"><strong>Course #1</strong></a>
          <a href="#" className="list-group-item list-group-item-action text-center" data-toggle="modal" data-target="#myModal"><strong>Course #2</strong></a>
          <a href="#" className="list-group-item list-group-item-action text-center" data-toggle="modal" data-target="#myModal"><strong>Course #3</strong></a>
          <a href="#" className="list-group-item list-group-item-action text-center" data-toggle="modal" data-target="#myModal"><strong>Course #4</strong></a>
          <a href="#" className="list-group-item list-group-item-action text-center" data-toggle="modal" data-target="#myModal"><strong>Course #5</strong></a>
          <a href="#" className="list-group-item list-group-item-action text-center" data-toggle="modal" data-target="#myModal"><strong>Course #6</strong></a> 
        </div> */}
      </div>
      </div>
    </div>
   
  )
  }
  
  export default Enroll;