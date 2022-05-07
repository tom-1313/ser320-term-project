import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";

function Setting() {
  return (
    <NavDropdown className="topRight dropdown-toggle" title={<FontAwesomeIcon icon={faGear} className="text-dark"/>} id="dropdown-basic">
        <NavDropdown.Item>Edit</NavDropdown.Item>
        <NavDropdown.Item>Delete</NavDropdown.Item>
    </NavDropdown>
  );
}

export default Setting;
