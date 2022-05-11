import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import qu from "../resources/qu-logo-white.png";
import Modal from "react-modal";
import { modalStyle } from "../utils";
import Enroll from "../Enroll";
import CreateCourse from "./CreateCourse";
import { logoutUser } from "../services/authService";

Modal.setAppElement("#root");

function Navbar(props) {
  const [enrollIsOpen, setEnrollIsOpen] = useState(false);
  const [createIsOpen, setCreateIsOpen] = useState(false);

  function openModal(modal) {
    if (modal === "enroll") {
      setEnrollIsOpen(true);
    }
    if (modal === "create") {
      setCreateIsOpen(true);

    }
  }

  function closeModal() {
    setCreateIsOpen(false);
    setEnrollIsOpen(false);
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
                <a className="nav-link" onClick={() => openModal("create")}>
                  Create Course
                </a>
              </li>
            )}
            {!props.isFaculty && (
              <li className="nav-item">
                <a className="nav-link" onClick={() => openModal("enroll")}>
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
      <Modal isOpen={enrollIsOpen} style={modalStyle}>
        <Enroll closeModal={closeModal} addCourse={props.addCourse} />
      </Modal>
      <Modal isOpen={createIsOpen} style={modalStyle}>
        <CreateCourse closeModal={closeModal} addCourse={props.addCourse} />
      </Modal>
    </div>
  );
}

export default Navbar;
