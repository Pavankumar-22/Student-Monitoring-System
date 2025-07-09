import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <NavLink to="/">Student Monitoring System</NavLink>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/students">Students</NavLink></li>
        <li><NavLink to="/enrollments">Enrollments</NavLink></li>
        <li><NavLink to="/courses">Courses</NavLink></li>
        <li><NavLink to="/attendance">Attendance</NavLink></li>
        <li><NavLink to="/analytics">Analysis</NavLink></li>
        <li><NavLink to="/users">Users</NavLink></li>
        
      </ul>
    </nav>
  );
}

export default Navbar;