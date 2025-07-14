// src/shared/layout/Navbar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Navbar.css";
import { useAuth } from "../../context/authContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <NavLink to={user ? "/dashboard" : "/"}>Student Monitoring System</NavLink>
      </div>
      <ul className="navbar-links">
        {user && (
          <>
            <li><NavLink to="/students">Students</NavLink></li>
            <li><NavLink to="/enrollments">Enrollments</NavLink></li>
            <li><NavLink to="/courses">Courses</NavLink></li>
            <li><NavLink to="/attendance">Attendance</NavLink></li>
            {user.role === "admin " && <li><NavLink to="/analytics">Analysis</NavLink></li>}
            <li><NavLink to="/users">Users</NavLink></li>
            <li><button onClick={logout}>Logout</button></li>
          </>
        )}
        {!user && (
          <>
            <li><NavLink to="/login">Login</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
