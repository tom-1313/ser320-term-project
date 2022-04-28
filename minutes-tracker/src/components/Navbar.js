import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {

  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
        <img
          src={
            "https://www.qu.edu/49f5e9/globalassets/global/media/qu/logos/0_home/header-logo.png"
          }
          alt="Quinnipiac University"
          width="100"
        />

        <div id="navbarSupportedContent" className="ml-auto">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/dashboard">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/createEvent">
                Create Course
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
