import React from "react";
import Setting from "./Setting";
import { Link } from "react-router-dom";

//TODO:
//add onClicks to buttons to create modals
function CourseCard(props) {
  return (
    <div className="card course-card">
      <div className="card-body">
        <h2 className="card-title">{props.course.name}</h2>
        {props.isFaculty && (
          <div className="text-center">
            <Link
              className="btn btn-primary"
              to="/preview"
              state={props.course}
            >
              Preview Course Data
            </Link>
          </div>
        )}

        {!props.isFaculty && (
          <div className="text-center">
            <button className="btn btn-primary">Enter Time</button>
          </div>
        )}
      </div>
      <Setting />
    </div>
  );
}

export default CourseCard;
