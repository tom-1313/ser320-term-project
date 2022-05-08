import React, { useState } from "react";
import Setting from "./Setting";
import { Link } from "react-router-dom";

function CourseCard(props) {
  const [course, setCourse] = useState(props.course);

  const updateCourse = (course) => {
    setCourse(course);
  }

  return (
    <div className="card course-card">
      <div className="card-body">
        <h2 className="card-title">{course.name}</h2>

        {props.isFaculty && (
          <div className="text-center">
            <Link className="btn btn-primary" to="/preview" state={course}>
              Preview Data
            </Link>
          </div>
        )}

        {!props.isFaculty && (
          <div className="text-center">
            <button className="btn btn-primary" onClick={() => props.openModal(course)}>Enter Time</button>
          </div>
        )}
      </div>

      {props.isFaculty && (
        <Setting
          openModal={props.openModal}
          openConfirmModal={props.openConfirmModal}
          course={course}
          update={updateCourse}
        />
      )}
    </div>
  );
}

export default CourseCard;
