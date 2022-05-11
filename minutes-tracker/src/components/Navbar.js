import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import qu from "../resources/qu-logo-white.png";
import Modal from "react-modal";
import { modalStyle } from "../utils";
import Enroll from "../Enroll";
import { logoutUser } from "../services/authService";

Modal.setAppElement("#root");

function Navbar(props) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark nav-color">
        <img
          src={qu}
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
                <NavLink className="nav-link" to="/createCourse">
                  Create Course
                </NavLink>
              </li>
            )}
            {!props.isFaculty && (
              <li className="nav-item">
                <a className="nav-link" onClick={openModal}>
                  Enroll in Course
                </a>
              </li>
            )}
          </ul>
          <ul className="navbar-nav">
            <NavLink className="nav-link" to="/login" onClick={logoutUser}>
              Logout
            </NavLink>
          </ul>
        </div>
      </nav>
      <Modal isOpen={isOpen} style={modalStyle}>
        <Enroll closeModal={closeModal} addCourse={props.addCourse} />
      </Modal>
    </div>
  );
}

export default Navbar;
