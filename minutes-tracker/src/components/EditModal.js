import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { updateCourse, createEntry } from "../services/userService.js";

const resetErrors = {
  lesson: false,
  homeworkMin: false,
  homeworkHour: false,
  studyMin: false,
  studyHour: false,
  projectMin: false,
  projectHour: false,
};

const resetHelper = {
  lesson: "",
  homeworkMin: "",
  homeworkHour: "",
  studyMin: "",
  studyHour: "",
  projectMin: "",
  projectHour: "",
};

function EditModal(props) {
  const [course, setCourse] = useState(props.course);

  const [entry, setEntry] = useState({
    lesson: "",
    homeworkMin: "",
    homeworkHour: "",
    studyMin: "",
    studyHour: "",
    projectMin: "",
    projectHour: "",
  });

  const [helper, setHelper] = useState({
    lesson: "",
    homeworkMin: "",
    homeworkHour: "",
    studyMin: "",
    studyHour: "",
    projectMin: "",
    projectHour: "",
  });

  const [error, setError] = useState(resetErrors);

  function close(e) {
    e.preventDefault();
    props.close();
  }

  function handleChange(e) {
    const { name, value } = e.target;

    if (props.isFaculty) {
      setCourse((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    } else {
      setEntry((prev) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
  }

  function updateError(name) {
    setError((prev) => {
      return {
        ...prev,
        [name]: true,
      };
    });
  }

  function addHelperText(name, text) {
    setHelper((prev) => {
      return {
        ...prev,
        [name]: text,
      };
    });
  }

  function validate() {
    let numOfErrors = 0;

    Object.keys(entry).forEach((key, i) => {
      //check the lesson
      const value = entry[key];
      if (i === 0) {
        if (value === "") {
          numOfErrors++;
          updateError("lesson", true);
          addHelperText("lesson", "Please select a lesson");
        }
      } else {
        //check all everything else
        if (value !== "" && !Number.isFinite(parseInt(value))) {
          numOfErrors++;
          updateError(key, true);
          addHelperText(key, "Invalid number");
        }
      }
    });

    return numOfErrors === 0;
  }

  function convertToMinutes() {
    let newEntry = {
      lesson: entry.lesson,
    };

    const keys = Object.keys(entry);

    for (let i = 1; i < keys.length; i += 2) {
      let minutes = parseInt(entry[keys[i]]);
      let hours = parseInt(entry[keys[i + 1]]);

      //check for NaN
      if (isNaN(hours)) hours = 0;
      if (isNaN(minutes)) minutes = 0;

      //convert to minutes
      minutes += hours * 60;

      //Set time based on loop iteration
      if (i === 1) newEntry.homework = minutes;
      if (i === 3) newEntry.study = minutes;
      if (i === 5) newEntry.project = minutes;
    }

    //TODO: Change to studentId
    //add studentId
    newEntry.student = "626ab90c72203966d213eb7f";
    return newEntry;
  }

  function onSubmit(e) {
    //Prevent form from refreshing page
    e.preventDefault();

    if (props.isFaculty) {
      updateCourse(course._id, course)
        .then((res) => {
          //update the card
          props.updateCourse(course);
          props.close();
        })
        .catch((err) => console.log(err));
    } else {
      setError(resetErrors);
      setHelper(resetHelper);

      //Validate the entry state
      if (validate()) {
        //convert the entry state to the propper format
        const entrySub = convertToMinutes();

        //send request to server
        createEntry(course._id, entrySub)
          .then((res) => {
            console.log(res.data);
            props.close();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  return (
    <div>
      <form className="modal-style">
        {props.isFaculty ? (
          <div>
            <h4>Editing Course: {course.name}</h4>
            <label htmlFor="course-name">Course name:</label>
            <br />
            <input
              type="text"
              id="course-name"
              name="name"
              value={course.name}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <label htmlFor="lessons"># of lessons:</label>
            <br />
            <input
              type="text"
              id="lessons"
              name="totalLesson"
              value={course.totalLesson}
              onChange={(e) => handleChange(e)}
            />
            <br />
          </div>
        ) : (
          <div className="text-center">
            <h4>{course.name}</h4>
            <FormControl fullWidth>
              <InputLabel id="lesson-select">Lesson</InputLabel>
              <Select
                labelId="lesson-select"
                name="lesson"
                value={entry.lesson}
                label="Lesson"
                onChange={handleChange}
                error={error.lesson}
              >
                {[...Array(course.totalLesson)].map((e, i) => {
                  return (
                    <MenuItem key={i} value={i + 1} name="lesson">
                      {i + 1}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
            <div>
              <TextField
                label="Study hours"
                name="studyHour"
                margin="normal"
                value={entry.studyHour}
                onChange={handleChange}
                error={error.studyHour}
                helperText={helper.studyHour}
              />
              <TextField
                label="Study minutes"
                name="studyMin"
                margin="normal"
                value={entry.studyMin}
                onChange={handleChange}
                error={error.studyMin}
                helperText={helper.studyMin}
              />
            </div>
            <div>
              <TextField
                label="Homework hours"
                name="homeworkHour"
                margin="normal"
                value={entry.homeworkHour}
                onChange={handleChange}
                error={error.homeworkHour}
                helperText={helper.homeworkHour}
              />
              <TextField
                label="Homework minutes"
                name="homeworkMin"
                margin="normal"
                value={entry.homeworkMin}
                onChange={handleChange}
                error={error.homeworkMin}
                helperText={helper.homeworkMin}
              />
            </div>
            <div>
              <TextField
                label="Project hours"
                name="projectHour"
                margin="normal"
                value={entry.projectHour}
                onChange={handleChange}
                error={error.projectHour}
                helperText={helper.projectHour}
              />
              <TextField
                label="Project minutes"
                name="projectMin"
                margin="normal"
                value={entry.projectMin}
                onChange={handleChange}
                error={error.projectMin}
                helperText={helper.projectMin}
              />
            </div>
          </div>
        )}
        <div className="text-center">
          <button className="btn btn-secondary" onClick={(e) => close(e)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
