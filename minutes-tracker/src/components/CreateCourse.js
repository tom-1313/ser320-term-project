import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/userService";
import Navbar from "./Navbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";


function CreateCourse() {
    const history = useNavigate();
    const [course, setCourse] = useState({
            name: "",
            totalLesson: "",
            faculty: "",
            entry: []
    });

    function handleChange(e) {
        console.log(e.currentTarget.value);
        const { name, value } = e.target;
        setCourse((prev) => {
            return {
              ...prev,
              [name]: value,
            };
        })
    };

    function handleSubmit(e) {
        e.preventDefault();

        createCourse(course)
        .then((res) => {
            //update the state
            console.log(JSON.stringify(res));
            history("/dashboard");
        })
        .catch((err) => console.log(err));
    };

    return (
        <div>
            <Navbar isFaculty={true} />
            <div className="" id="createCourseScreen">
            <div id="j-tron" className="jumbotron jumbotron-fluid">
                <div className="container text-center">
                <h1 className="display-4">Create a Course.</h1>
                <p className="lead">Please input a course name and the number of lessons for the course.</p>
                </div>
            </div>
                <form id="createCourseForm" onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="inputCourseName" className="form-label">Course Name</label>
                    <input type="text" className="form-control" id="inputName" name="name" onChange={handleChange} />
                </div>
                <div id="numLessons" className="mb-2">
                    <label id="lessonLabel" htmlFor="inputLessons" className="form-label">Number of Lessons</label>
                    <Select id="lessonSelect"
                        labelId="num-lessons"
                        name="lesson"
                        value={course.totalLesson}
                        label="Total Lessons"
                        onChange={handleChange}
                        >
                        {[...Array(40)].map((e, i) => {
                            return (
                            <MenuItem key={i} value={i + 1} name="lesson">
                                {i + 1}
                            </MenuItem>
                            );
                        })}
                    </Select>
                </div>
                <button type="submit" className="btn btn-dark">Create Course</button>
            </form>
            </div>
        </div>
    )
}

export default CreateCourse
