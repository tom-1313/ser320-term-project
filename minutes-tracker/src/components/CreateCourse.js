import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/userService";
import Navbar from "./Navbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from '@mui/material/styles';


function CreateCourse() {
    const theme = useTheme();

    const history = useNavigate();
    const [course, setCourse] = useState({
            name: "",
            totalLesson: "",
            faculty: "",
            entry: []
    });

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

    function handleChange(e) {
        //console.log(e.currentTarget.value);
        const { name, value } = e.target;
        setCourse((prev) => {
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
        setCourse(
          typeof value === 'string'
        );
      };

    function handleSubmit(e) {
        e.preventDefault();

        createCourse(course)
        .then((res) => {
            //update the route
            console.log(JSON.stringify(res));
            history("/dashboard");
        })
        .catch((err) => console.log(err));
    };

    const lessonArray = Array.from({length: 40}, (_, i) => i + 1);    

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
                        name="totalLesson"
                        value={course.totalLesson}
                        label="Total Lessons"
                        onChange={handleChange}
                        MenuProps={MenuProps}
                        >
                        {lessonArray.map((e, i) => {
                            return (
                            <MenuItem key={i} value={e} name="totalLesson">
                                {e}
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
