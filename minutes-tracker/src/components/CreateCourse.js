import React, { useState } from "react";
import { useLocation , useNavigate} from "react-router-dom";
import { createCourse } from "../services/userService";
import Navbar from "./Navbar";


function CreateCourse() {
    const history = useNavigate();
    //const { state: course } = useLocation();
    const [course, setCourse] = useState({
            name: "",
            totalLesson: "",
            faculty: "",
            entry: []
    });
    //const [course, setCourse] = useState(props.course);
    //const [account, setAccount] = useState(props.account);

    // function handleChange(e) {
    //     console.log(e.currentTarget.value);
    //     const { name, value } = e.target;
    //     setCourse((prev) => {
    //         return {
    //           ...prev,
    //           [name]: value,
    //         };
    //     })
    // };

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
                    <input type="text" className="form-control" id="inputName" name="courseName" />
                </div>
                <div id="numLessons" className="mb-2">
                    <label htmlFor="inputLessons" className="form-label">Number of Lessons</label>
                    <input type="number" className="form-control" id="inputLessons" name="numLessons" 
                    aria-describedby="lessonsHelp"/>
                    <div id="lessonsHelp" className="form-text">There cannot be more than 60 lessons in a course.</div>
                </div>
                <button type="submit" className="btn btn-dark">Create Course</button>
            </form>
            </div>
        </div>
    )
}

export default CreateCourse
