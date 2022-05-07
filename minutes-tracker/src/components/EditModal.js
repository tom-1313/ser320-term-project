import React, { useState } from "react";
import { updateCourse } from "../services/userService.js";

function EditModal(props) {
  const [course, setCourse] = useState(props.course);
  function close(e) {
    e.preventDefault();
    props.close();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setCourse((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  function onSubmit(e) {
    e.preventDefault();
    updateCourse(course._id, course)
      .then((res) => {
        //update the card
        props.updateCourse(course);
        props.close();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <form>
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
        <div className="text-center">
          <button className="btn btn-danger" onClick={(e) => close(e)}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={(e) => onSubmit(e)}>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
