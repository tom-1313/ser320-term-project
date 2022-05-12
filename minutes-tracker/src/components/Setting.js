import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

function Setting(props) {
  return (
    <NavDropdown
      className="topRight dropdown-toggle"
      title={<FontAwesomeIcon icon={faGear} className="text-dark" />}
      id="dropdown-basic"
    >
      <NavDropdown.Item
        onClick={() => {
          props.openModal(props.course, props.update);
        }}
      >
        Edit
      </NavDropdown.Item>
      <NavDropdown.Item
        onClick={() => props.openConfirmModal(props.course._id)}
      >
        Delete
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default Setting;
