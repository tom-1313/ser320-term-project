import React from "react";
import { NavLink } from "react-router-dom";
import qu from '../resources/qu-logo-white.png';

function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark nav-color">
        <img
          src={
            qu
          }
          alt="Quinnipiac University"
          width="100"
          className="logo"
        />

        <div id="navbarSupportedContent" className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Home
              </NavLink>
            </li>
            {props.isFaculty && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/createEvent">
                  Create Course
                </NavLink>
              </li>
            )}
            {!props.isFaculty && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/enroll">
                  Enroll in Course
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            <NavLink className="nav-link" to="/login">
              Logout
            </NavLink>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
