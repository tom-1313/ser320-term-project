import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCourse } from "../services/userService";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { useTheme } from "@mui/material/styles";
import { getCurrentUser } from "../services/authService";
import { FormControl } from "@mui/material";

const user = getCurrentUser();

function CreateCourse(props) {
  const theme = useTheme();

  const history = useNavigate();
  const [error, setError] = useState({
    isError: false,
  });
  const [course, setCourse] = useState({
    name: "",
    totalLesson: 15,
    faculty: user.id,
    entry: [],
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
    const { name, value } = e.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  const handleSelect = (event) => {
    const {
      target: { value },
    } = event;
    setCourse(typeof value === "string");
  };

  function validate() {
    if (course.name === "") {
      setError({
        isError: true,
        text: "Please enter a course name",
      });
      return false;
    }
    return true;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError({ isError: false });

    if (validate()) {
      createCourse(course)
        .then((res) => {
          props.addCourse(res.data);
          props.closeModal();
        })
        .catch((err) => console.log(err));
    }
  }

  const lessonArray = Array.from({ length: 40 }, (_, i) => i + 1);

  return (
    <div>
      <div className="" id="createCourseScreen">
        <div id="j-tron" className="jumbotron jumbotron-fluid">
          <div className="container text-center">
            <h1 className="display-4">Create a Course</h1>
            <p className="lead">
              Please input a course name and the number of lessons for the
              course.
            </p>
          </div>
        </div>
        <form id="createCourseForm" onSubmit={handleSubmit}>
          <div className="mb-2">
            <TextField
              label="Course Name"
              type="text"
              className="form-control"
              id="inputName"
              name="name"
              value={course.name}
              onChange={handleChange}
              error={error.isError}
              helperText={error.text}
            />
          </div>
          <div id="numLessons" className="mb-2">
            <FormControl fullWidth>
              <InputLabel id="lesson-select">Number of Lessons</InputLabel>
              <Select
                id="lessonSelect"
                value={course.totalLesson}
                name="totalLesson"
                label="Number of Lessons"
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
            </FormControl>
          </div>
          <div className="text-center">
            <button
              className="btn btn-secondary"
              onClick={(e) => props.closeModal()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
